import React from 'react'
import Validator from 'validatorjs'
import { Trans } from '@lingui/react'

/*--------------------------------------------*
 * Character limits
 *--------------------------------------------*/

const INPUT_FIELD_MAX_CHARS = 500


/*--------------------------------------------*
 * Error message strings
 *--------------------------------------------*/
export const errorMessages = {}



errorMessages.emailErrorMessage = (
  <Trans>
    We need your email address so we can send you a confirmation message.
  </Trans>
)

errorMessages.emailInvalidErrorMessage = (
  <Trans>
    Please make sure you provide a valid email address. For example,
    ‘yourname@example.com’.
  </Trans>
)


errorMessages.paperFileNumberErrorMessage = (
  <Trans>We need your BIL file number so we can confirm your identity.</Trans>
)

errorMessages.paperFileNumberInvalidErrorMessage = (
  <Trans>
    BIL file number requires 1 letter and 12 digits.
  </Trans>
)


errorMessages.selectedDaysEmptyErrorMessage = (
  <Trans>You must select 3 days on the calendar below.</Trans>
)

errorMessages.selectedDaysCountErrorMessage = (
  <Trans>You must select 3 days on the calendar below.</Trans>
)

errorMessages.selectedDaysMinMaxErrorMessage = (
  <Trans>Exactly three dates must be passed</Trans>
)

errorMessages.inErrorMessage = (
  <Trans>Reason needs to be on the list provided. Please pick one.</Trans>
)

/* Error message object */

export const defaultMessages = {
  'required.fullName': 'fullNameErrorMessage',
  'max.fullName': 'fullNameMaxErrorMessage',
  'required.email': 'emailErrorMessage',
  'email.email': 'emailInvalidErrorMessage',
  'emailConfirm.emailConfirm': 'emailConfirmInvalidErrorMessage',
  'required.paperFileNumber': 'paperFileNumberErrorMessage',
  'required.reason': 'reasonErrorMessage',
  'required.explanation': 'explanationErrorMessage',
  'max.explanation': 'explanationMaxErrorMessage',
  'required_with.familyCheck': 'familyCheckRequiredWithErrorMessage',
  'required_with.familyOption': 'familyOptionRequiredWithErrorMessage',
  'max.familyOption': 'familyOptionMaxErrorMessage',
  'required.selectedDays': 'selectedDaysEmptyErrorMessage',
  'required.explanationPage': 'explanationPageErrorMessage',
  'max.explanationPage': 'explanationPageMaxErrorMessage',
  in: 'inErrorMessage',
}

/*--------------------------------------------*
 * Form Fields & Rules
 *--------------------------------------------*/

// const getPaperFileNumberPattern = () => {
//   if (
//     !process.env.RAZZLE_PAPER_FILE_NUMBER_PATTERN &&
//     !typeof RAZZLE_PAPER_FILE_NUMBER_PATTERN
//   ) {
//     throw new Error('PAPER_FILE_NUMBER_PATTERN must be defined')
//   }

//   let paperFileNumberPattern =
//     process.env.RAZZLE_PAPER_FILE_NUMBER_PATTERN ||
//     typeof RAZZLE_PAPER_FILE_NUMBER_PATTERN //

//   return paperFileNumberPattern
// }

export const RegistrationFields = {
  email: 'required|email',
  emailConfirm: 'required|emailConfirm',
  familyCheck: `required_with:familyOption`,
  familyOption: `required_with:familyCheck|max:${INPUT_FIELD_MAX_CHARS}`,
  paperFileNumber: 'required|paper_file_number',
}


export const CalendarFields = {
  selectedDays: 'required|array|date_count',
  availability: 'accept_anything',
}

export const SelectLocationFields = {
  locationCity: 'required', 
  locationId: 'required',
  locationAddress: 'required',
}

export const SelectTimeSlotField = {
  timeSlot: 'required', 
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

const dateCount = (value, requirement, attribute) => {
  return Number(value.length) === 1
}

Validator.register('date_count', dateCount, 'selectedDaysCountErrorMessage')

Validator.register(
  'accept_anything',
  function(value, requirement, attribute) {
    return true
  },
  'This error message will never be called',
)

Validator.register(
  'paper_file_number',
  function(value, requirement, attribute) {
    // eslint-disable-next-line security/detect-non-literal-regexp
    const regex = new RegExp('^'+'[a-zA-Z]{1}[0-9]{12}' + '$','i')
    return regex.test(value)
  },
  'paperFileNumberInvalidErrorMessage',
)
