import { sendNotification } from './sendmail';
import { logerror } from '../utils/logger';

const CONFIRMATION_EMAIL = 'af563da5-43bd-4b9a-9610-e3990a7f4315'



export const handleSubmitEmail = async (req, res) => {
  let input = Object.assign({}, req.body) // make a new object
  if (input.templateId === CONFIRMATION_EMAIL){
    console.log("handleSubmitEmail Line 11:"+JSON.stringify(input))
    console.log("handleSubmitEmail Line 12:"+input.accessibility)
 try {
    const response = await sendNotification({
      email: input.email,
      templateId: input.templateId,
      options: {
        personalisation : {
          hashFromData:input.hashFromData,
          paperFileNumber: input.paperFileNumber,
          location: input.location,
          selectedDay: input.selectedDay,
          selectedTime: input.selectedTime,
          accessibility: input.accessibility.length > 0 ? input.accessibility[0] : 'No',
        },
      },
    }).catch(err => {
      logerror(err)
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
  logerror(`Unknown Email Template ID ${input.templateId || 'empty'}`)
  return res.redirect('/error')
}
