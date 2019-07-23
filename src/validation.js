import React from 'react'
import Validator from 'validatorjs'
import { Trans } from '@lingui/react'

/*--------------------------------------------*
 * Character limits
 *--------------------------------------------*/

const INPUT_FIELD_MAX_CHARS = 500
const TEXTAREA_MAX_CHARS = 1500

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

errorMessages.fullNameMaxErrorMessage = (
  <Trans>
    Needs to be shorter than 20 words. Please use the name recorded on your
    application.
  </Trans>
)

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

errorMessages.familyCheckRequiredWithErrorMessage = (
  <Trans>
    You must click ‘I need to reschedule my family too’ if you are rescheduling
    family members.
  </Trans>
)

errorMessages.familyOptionRequiredWithErrorMessage = (
  <Trans>
    You left this blank. Do you want to reschedule any family members? Please
    provide their full names.
  </Trans>
)

errorMessages.familyOptionMaxErrorMessage = (
  <Trans>
    There is a limit of 150 words for your family’s names. Please shorten your
    explanation.
  </Trans>
)

errorMessages.paperFileNumberErrorMessage = (
  <Trans>We need your paper file number so we can confirm your identity.</Trans>
)

errorMessages.paperFileNumberInvalidErrorMessage = (
  <Trans>
    Needs a number with a different format. Please make sure this is your
    correct Paper file number.
  </Trans>
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

errorMessages.explanationMaxErrorMessage = (
  <Trans>
    Sorry, there‘s a limit of 150 words for this explanation. Please shorten
    your explanation.
  </Trans>
)

errorMessages.explanationPageErrorMessage = (
  <Trans>Please provide us with more information.</Trans>
)

errorMessages.explanationPageMaxErrorMessage = (
  <Trans>
    Sorry, there’s a limit of 150 words for this explanation. Please shorten
    your explanation.
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

const getPaperFileNumberPattern = () => {
  if (
    !process.env.RAZZLE_PAPER_FILE_NUMBER_PATTERN &&
    !typeof RAZZLE_PAPER_FILE_NUMBER_PATTERN
  ) {
    throw new Error('PAPER_FILE_NUMBER_PATTERN must be defined')
  }

  let paperFileNumberPattern =
    process.env.RAZZLE_PAPER_FILE_NUMBER_PATTERN ||
    typeof RAZZLE_PAPER_FILE_NUMBER_PATTERN //

  return paperFileNumberPattern
}

export const RegistrationFields = {
  fullName: `required|max:${INPUT_FIELD_MAX_CHARS}`,
  email: 'required|email',
  explanation: `required|max:${TEXTAREA_MAX_CHARS}`,
  familyCheck: `required_with:familyOption`,
  familyOption: `required_with:familyCheck|max:${INPUT_FIELD_MAX_CHARS}`,
  paperFileNumber: 'required|paper_file_number',
  reason: 'required|in:travel,medical,workOrSchool,family,other',
}

export const ExplanationFields = {
  explanationPage: `required|max:${INPUT_FIELD_MAX_CHARS}`,
}

export const CalendarFields = {
  selectedDays: 'required|array|date_count',
  availability: 'accept_anything',
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
    const regex = new RegExp('^' + getPaperFileNumberPattern() + '$', 'i')
    return regex.test(value)
  },
  'paperFileNumberInvalidErrorMessage',
)
