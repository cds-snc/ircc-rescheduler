import { sendNotification } from './sendmail'
import { logDebug, logError } from '../utils/logger'
import http from 'http'

const apiHost = process.env.CONNECTION_STRING
const CONFIRMATION_EMAIL = 'af563da5-43bd-4b9a-9610-e3990a7f4315'

export const getEmailConfirm = (documentId, cb) => {
  let data = ''
  http
    .get(`${apiHost}/appointments/confirm/${documentId}`, resp => {
      logDebug(`STATUS: ${resp.statusCode}`)
      logDebug(`HEADERS: ${JSON.stringify(resp.headers)}`)
      resp.on('data', chunk => {
        data += chunk
      })
      resp.on('end', function() {
        data = JSON.parse(data)

        cb(null, data.confirmation)
      })
    })
    .on('error', err => {
      logError(
        'Something went wrong when calling the API appointments/confirmation:  ' +
          err.message,
      )
      cb(err)
    })
}

export const handleSubmitEmail = async (req, res) => {
  let input = Object.assign({}, req.body)

  if (input.templateId === CONFIRMATION_EMAIL) {
    getEmailConfirm(input.hashFromData, function(err, confirmation) {
      if (err) {
        return res.redirect('/confirmation/client-request-issue')
      }

      try {
        const response = sendNotification({
          email: input.email,
          templateId: input.templateId,
          options: {
            personalisation: {
              hashFromData: confirmation,
              paperFileNumber: input.paperFileNumber,
              location: input.location,
              selectedDay: input.selectedDay,
              selectedTime: input.selectedTime,
              accessibility:
                input.accessibility.length > 0 ? input.accessibility[0] : 'No',
            },
          },
        }).catch(err => {
          return res.redirect('/confirmation/client-request-issue')
        })

        //Caught an error earlier in the process
        if (response === false) {
          return res.redirect('/confirmation/client-request-issue')
        }
      } catch (err) {
        return res.redirect('/error')
      }
      return res.redirect('/confirmation')
    })
  } else {
    return res.redirect('/error')
  }
}
