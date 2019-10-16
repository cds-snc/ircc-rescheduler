import { sendNotification } from './sendmail'
import { logDebug, logError, logerror } from '../utils/logger'
import http from "http"

const apiHost = process.env.CONNECTION_STRING
const CONFIRMATION_EMAIL = 'af563da5-43bd-4b9a-9610-e3990a7f4315'

export const getEmailConfirm = (documentId, cb) => {
  console.log(documentId)
  let data = ''
  http
    .get(`${apiHost}/appointments/confirm/${documentId}`, resp => {
      logDebug(`STATUS: ${resp.statusCode}`)
      logDebug(`HEADERS: ${JSON.stringify(resp.headers)}`)
      resp.on('data', chunk => {
        data += chunk
      })
      resp.on('end', function() {
        console.log(data)
        cb(null, data.confirmation)
        console.log(data)
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
  console.log(input)// make a new object
  if (input.templateId === CONFIRMATION_EMAIL) {
    console.log("before email confirm "+input.hashFromData)
    getEmailConfirm(input.hashFromData, function(err, confirmation){
      if (err){
        console.log(err)
        return res.redirect('/confirmation/client-request-issue')
      }
      console.log("after email confirm")
      console.log(confirmation)
      try {
        const response = sendNotification({
          email: input.email,
          templateId: input.templateId,
          options: {
            personalisation: {
              hashFromData: input.hashFromData,
              paperFileNumber: input.paperFileNumber,
              location: input.location,
              selectedDay: input.selectedDay,
              selectedTime: input.selectedTime,
              accessibility: input.accessibility.length > 0 ? input.accessibility[0] : 'No',
            },
          },
        }).catch(err => {
          console.log(err)
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
    console.log(`Unknown Email Template ID ${input.templateId || 'empty'}`)
    return res.redirect('/error')
  }
}