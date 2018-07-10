import Validator from 'validatorjs'

/*--------------------------------------------*
 * Character limits 
 *--------------------------------------------*/

const inputFieldMaxChars = 500
const textAreaMaxChars = 2000

/*--------------------------------------------*
 * Error message strings 
 *--------------------------------------------*/

export const fullNameErrorMessage =
  'You need to tell us your name so we know who is requesting a new appointment.'

export const emailErrorMessage =
  'We need your email address so we can send you a confirmation message.'

export const paperFileNumberErrorMessage =
  'We need your paper file number so we can confirm your identity.'

export const reasonErrorMessage =
  'Please tell us why you need to reschedule your appointment. If none of the options fit your situation, choose ‘Other’.'

export const explanation =
  'Please tell us a bit more about why you need to reschedule your appointment.'

export const selectedDaysEmptyErrorMessage =
  'You must select 3 days. Please select 2 more days to continue.'

export const selectedDaysMinMaxErrorMessage =
  'Exactly three dates must be passed'

export const inErrorMessage = 'Invalid information' //value passed was not in allowed values

/* Error message object */

export const defaultMessages = {
  'required.fullName': fullNameErrorMessage,
  'required.email': emailErrorMessage,
  'email.email': emailErrorMessage,
  'required.paperFileNumber': paperFileNumberErrorMessage,
  'regex.paperFileNumber': paperFileNumberErrorMessage,
  'required.reason': reasonErrorMessage,
  'required.selectedDays': selectedDaysEmptyErrorMessage,
  in: inErrorMessage,
}

/*--------------------------------------------*
 * Form Fields & Rules
 *--------------------------------------------*/

export const RegistrationFields = {
  fullName: `required|max:${inputFieldMaxChars}`,
  email: 'required|email',
  explanation: `required|max:${textAreaMaxChars}`,
  paperFileNumber: ['required'],
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
  selectedDaysMinMaxErrorMessage,
)
