import React from 'react'
import Validator from 'validatorjs'
import { Trans } from '@lingui/react'

/*--------------------------------------------*
 * Character limits
 *--------------------------------------------*/

// const INPUT_FIELD_MAX_CHARS = 500

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

errorMessages.emailConfirmErrorMessage = (
  <Trans>We need you to confirm your email address.</Trans>
)

errorMessages.policyCheckRequiredWithErrorMessage = (
  <Trans>
    In order to start your request, you must first read and accept the privacy
    notice statement.
  </Trans>
)
errorMessages.emailConfirmMatchErrorMessage = (
  <Trans>Your email does not match. Please re-enter your email.</Trans>
)

errorMessages.emailConfirmInvalidErrorMessage = (
  <Trans>Must be a valid email address.</Trans>
)

errorMessages.paperFileNumberErrorMessage = (
  <Trans>
    We need your Application number so we can confirm your identity.
  </Trans>
)

errorMessages.paperFileNumberInvalidErrorMessage = (
  <Trans>The Application number entered is not valid.</Trans>
)

errorMessages.selectedDaysEmptyErrorMessage = (
  <Trans>You must select a date from the calendar.</Trans>
)

errorMessages.selectedDaysCountErrorMessage = (
  <Trans>You must select a time and date.</Trans>
)

errorMessages.selectedDaysMinMaxErrorMessage = (
  <Trans>Exactly three dates must be passed</Trans>
)

errorMessages.inErrorMessage = (
  <Trans>Reason needs to be on the list provided. Please pick one.</Trans>
)

/* Error message object */

export const defaultMessages = {
  'required.emailConfirm': 'emailConfirmErrorMessage',
  //'max.fullName': 'fullNameMaxErrorMessage',
  'required.email': 'emailErrorMessage',
  'email.email': 'emailInvalidErrorMessage',
  'email.emailConfirm': 'emailConfirmInvalidErrorMessage',
  'same.emailConfirm': 'emailConfirmMatchErrorMessage',
  'required.paperFileNumber': 'paperFileNumberErrorMessage',
  'required.reason': 'reasonErrorMessage',
  //'required.explanation': 'explanationErrorMessage',
  //'max.explanation': 'explanationMaxErrorMessage',
  'required.policyCheck': 'policyCheckRequiredWithErrorMessage',
  //'required_with.familyOption': 'familyOptionRequiredWithErrorMessage',
  //'max.familyOption': 'familyOptionMaxErrorMessage',
  'required.selectedDays': 'selectedDaysEmptyErrorMessage',
  //'required.explanationPage': 'explanationPageErrorMessage',
  //'max.explanationPage': 'explanationPageMaxErrorMessage',
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
  paperFileNumber: 'required|paper_file_number',
  email: `required|email`,
  emailConfirm: 'required|email|same:email',
  familyCheck: 'present',
  familyOption: 'present',
}

export const LandingFields = {
  policyCheck: 'required|in:value',
}

export const CalendarFields = {
  selectedDays: 'required|array|date_count',
  selectedTime: 'required',
  tempAppointment: 'accept_anything',
  availability: 'accept_anything',
}

export const SelectLocationFields = {
  locationCity: 'required',
  locationId: 'required',
  locationAddress: 'required',
  locationHours: 'required',
  locationBiokitNumber: 'required',
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
    const regex = new RegExp('^[a-zA-Z]{1}[0-9]{12}$', 'i')
    return regex.test(value)
  },
  'paperFileNumberInvalidErrorMessage',
)
