import {
  RegistrationFields,
  CalendarFields,
  getFieldNames,
  defaultMessages,
  getFieldErrorStrings,
} from '../validation'

import Validator from 'validatorjs'

it('Gets ar array of field names from Object Keys', () => {
  expect(getFieldNames(RegistrationFields)[0]).toEqual('fullName')
  expect(getFieldNames(CalendarFields)[0]).toEqual('selectedDays')
})

it('Show correct error message when passing bad data', () => {
  const vals = {
    fullName: 'John Li',
    email: 'not.an.email',
    paperFileNumber: '123',
  }

  const validate = new Validator(vals, RegistrationFields, defaultMessages)
  const success = validate.passes()

  expect(success).toEqual(false)
  expect(validate.errors.first('paperFileNumber')).toEqual(
    'invalidPaperFileNumberErrorMessage',
  )
  expect(validate.errors.first('email')).toEqual('invalidEmailErrorMessage')
})

it('Show correct error message when passing invalid fields', () => {
  const vals = {
    fullName: 'John Li',
    reason: 'not on the list',
  }
  const validate = new Validator(vals, RegistrationFields, defaultMessages)
  validate.passes()
  expect(validate.errors.first('reason')).toEqual('inErrorMessage')
})

it('Validates empty dates', () => {
  const vals = {
    selectedDays: null,
  }
  const validate = new Validator(vals, CalendarFields, defaultMessages)
  validate.passes()
  expect(validate.errors.first('selectedDays')).toEqual(
    'selectedDaysEmptyErrorMessage',
  )
})

it('Looks for dates to be passed as an array', () => {
  const vals = {
    selectedDays: true,
  }
  const validate = new Validator(vals, CalendarFields, defaultMessages)
  validate.passes()
  expect(validate.errors.first('selectedDays')).toEqual(
    'The selectedDays attribute has errors.',
  )
})

it('Validates when not enough dates have been passed', () => {
  const vals = {
    selectedDays: ['2018-06-29', '2018-07-31'],
  }
  const validate = new Validator(vals, CalendarFields, defaultMessages)
  validate.passes()
  expect(validate.errors.first('selectedDays')).toEqual(
    'selectedDaysMinMaxErrorMessage',
  )
})

it('Validates when too many dates have been passed', () => {
  const vals = {
    selectedDays: ['2018-01-01', '2018-01-02', '2018-01-03', '2018-01-04'],
  }

  const validate = new Validator(vals, CalendarFields, defaultMessages)

  validate.passes()

  expect(validate.errors.first('selectedDays')).toEqual(
    'selectedDaysMinMaxErrorMessage',
  )
})

it('Validates when correct amount of dates have been passed', () => {
  const vals = {
    selectedDays: ['2018-01-01', '2018-01-02', '2018-01-03'],
  }

  const validate = new Validator(vals, CalendarFields, defaultMessages)
  expect(validate.passes()).toEqual(true)
})

it('Gives back an error object with array of messages', () => {
  const vals = {
    selectedDays: ['2018-01-01', '2018-01-02', '2018-01-03'],
  }

  const validate = new Validator(vals, RegistrationFields, defaultMessages)
  validate.passes()
  expect(validate.errors.all().fullName[0]).toEqual('fullNameErrorMessage')
})

it('Gives back an first error in the array for each key', () => {
  const vals = {}

  const validate = new Validator(vals, RegistrationFields, defaultMessages)
  validate.passes()
  expect(getFieldErrorStrings(validate)['fullName']).toEqual(
    'fullNameErrorMessage',
  )
})
