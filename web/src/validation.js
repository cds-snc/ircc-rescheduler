import React from 'react'
import Validator from 'validatorjs'
import { Trans } from 'lingui-react'

/*--------------------------------------------*
 * Character limits 
 *--------------------------------------------*/

const inputFieldMaxChars = 500
const textAreaMaxChars = 2000

/*--------------------------------------------*
 * Error message strings 
 *--------------------------------------------*/
export const errorMessages = {}

errorMessages.fullNameErrorMessage = (
  <Trans>
    You need to tell us your name so we know who is requesting a new
    appointment.
  </Trans>
)

errorMessages.emailErrorMessage = (
  <Trans>
    We need your email address so we can send you a confirmation message.
  </Trans>
)

errorMessages.paperFileNumberErrorMessage = (
  <Trans>We need your paper file number so we can confirm your identity.</Trans>
)

errorMessages.reasonErrorMessage = (
  <Trans>
    Please tell us why you need to reschedule your appointment. If none of the
    options fit your situation, choose ‘Other’.
  </Trans>
)

errorMessages.explanationErrorMessage = (
  <Trans>
    Please tell us a bit more about why you need to reschedule your appointment.
  </Trans>
)

errorMessages.selectedDaysEmptyErrorMessage = (
  <Trans>You must select 3 days. Please select 2 more days to continue.</Trans>
)

errorMessages.selectedDaysMinMaxErrorMessage = (
  <Trans>Exactly three dates must be passed</Trans>
)

errorMessages.inErrorMessage = <Trans>Invalid information</Trans> //value passed was not in allowed values

/* Error message object */

export const defaultMessages = {
  'required.fullName': 'fullNameErrorMessage',
  'required.email': 'emailErrorMessage',
  'email.email': 'emailErrorMessage',
  'required.paperFileNumber': 'paperFileNumberErrorMessage',
  'regex.paperFileNumber': 'paperFileNumberErrorMessage',
  'required.reason': 'reasonErrorMessage',
  'required.explanation': 'explanationErrorMessage',
  'required.selectedDays': 'selectedDaysEmptyErrorMessage',
  in: 'inErrorMessage',
}

/*--------------------------------------------*
 * Form Fields & Rules
 *--------------------------------------------*/

const getPaperFileNumberPattern = () => {
  if (
    !process.env.RAZZLE_PAPER_FILE_NUMBER_PATTERN &&
    !typeof RAZZLE_PAPER_FILE_NUMBER_PATTERN
  ) {
    // eslint-disable-next-line no-console
    console.error('PAPER_FILE_NUMBER_PATTERN must be defined')
    return null
  }

  let paperFileNumberPattern =
    process.env.RAZZLE_PAPER_FILE_NUMBER_PATTERN ||
    typeof RAZZLE_PAPER_FILE_NUMBER_PATTERN //

  return paperFileNumberPattern
}

export const RegistrationFields = {
  fullName: `required|max:${inputFieldMaxChars}`,
  email: 'required|email',
  explanation: `required|max:${textAreaMaxChars}`,
  paperFileNumber: 'required|paper_file_number',
  reason: 'required|in:travel,medical,workOrSchool,family,other',
}

export const CalendarFields = {
  selectedDays: 'required|array|date_count',
}

/*--------------------------------------------*
 * Util Functions
 *--------------------------------------------*/

export const getFieldNames = (fields = {}) => {
  return Object.keys(fields)
}

export const getFieldErrorStrings = validate => {
  const allErrors = validate.errors.all()
  let mapped = {}
  Object.keys(allErrors).forEach(val => {
    mapped[val] = allErrors[val][0] // eslint-disable-line  security/detect-object-injection
  })

  return mapped
}

/*--------------------------------------------*
 * Custom Validation
 *--------------------------------------------*/

Validator.register(
  'date_count',
  function(value, requirement, attribute) {
    // requirement parameter defaults to null
    return Number(value.length) === 3
  },
  'selectedDaysMinMaxErrorMessage',
)

Validator.register(
  'paper_file_number',
  function(value, requirement, attribute) {
    // eslint-disable-next-line security/detect-non-literal-regexp
    const regex = new RegExp(getPaperFileNumberPattern(), 'i')
    return regex.test(value)
  },
  'paperFileNumberErrorMessage',
)
