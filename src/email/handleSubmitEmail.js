import { CalendarFields, RegistrationFields } from '../validation'
import Validator from 'validatorjs'
import { sendNotification } from './sendmail'
import { handleMailError, captureMessage } from '../utils/serverUtils'

const CONFIRMATION_EMAIL = 'af563da5-43bd-4b9a-9610-e3990a7f4315'
  


export const handleSubmitEmail = async (req, res) => {
  let input = Object.assign({}, req.body) // make a new object
  if (input.templateId === CONFIRMATION_EMAIL){
 try {
    const response = await sendNotification({
      email: input.email,
      templateId: input.templateId,
      options: {
        personalisation : {
          paperFileNumber: input.paperFileNumber,
          location: input.location,
          selectedDay: input.selectedDay,
          selectedTime: input.selectedTime,
          accessibility: input.accessibility || "No"
        }
      }
    }).catch(err => {
      console.error(err)
      return res.redirect('/confirmation/client-request-issue')
    })

    //Caught an error earlier in the process 
    if (response === false) {
      return res.redirect('/confirmation/client-request-issue')
    }
  }  
  catch (err) {
    return res.redirect('/error')
  }
  return res.redirect('/confirmation')
  }
  console.error(`Unknown Email Template ID ${input.templateId || 'empty'}`)
  return res.redirect('/error')
}