import { CalendarFields, RegistrationFields } from '../validation'
import Validator from 'validatorjs'
import { getMailer, getEmailParms, cleanDates, sendMail } from './sendmail'

import { handleMailError, captureMessage } from '../utils/serverUtils'

export const handleSubmitEmail = async (req, res) => {
  let input = Object.assign({}, req.body) // make a new object
  input.selectedDays = cleanDates(input.selectedDays)

  const validateReg = new Validator(input, RegistrationFields)

  if (!validateReg.passes()) {
    captureMessage('Register Page', validateReg)
    return res.redirect('/register?not-valid=true')
  }

  // validate the selected dates if availability explanation isn't found
  if (input.availabilityExplanation === '') {
    const validateCal = new Validator(input, CalendarFields)

    if (!validateCal.passes()) {
      captureMessage('Calendar Page', validateCal)
      return res.redirect('/calendar?not-valid=true')
    }
  }

  try {
    let staffResponse = { messageId: null }
    let applicantResponse = { messageId: null }

    const mailer = await getMailer()
    const params = await getEmailParms(input)

    staffResponse = await sendMail(mailer, params.staffParams).catch(
      handleMailError,
    )

    if (staffResponse.messageId) {
      // send applicant email only if staff email was sent
      applicantResponse = await sendMail(mailer, params.applicantParams).catch(
        handleMailError,
      )
    }

    if (
      staffResponse.messageId === null &&
      applicantResponse.messageId === null
    ) {
      // both emails failed to send
      return res.redirect('/error')
    }

    if (staffResponse.messageId === null) {
      // staff email failed send user to error page
      return res.redirect('/error')
    }

    if (applicantResponse.messageId === null) {
      // staff email send but applicant email didn't
      return res.redirect('/confirmation/client-request-issue')
    }
  } catch (e) {
    console.log(e) // eslint-disable-line no-console
    return res.redirect('/error')
  }

  return res.redirect('/confirmation')
}
