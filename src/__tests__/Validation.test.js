import {
  RegistrationFields,
  CalendarFields,
  getFieldNames,
  defaultMessages,
  getFieldErrorStrings,
} from '../validation'

import Validator from 'validatorjs'

describe('Validation', () => {
  it('Gets ar array of field names from Object Keys', () => {
    expect(getFieldNames(RegistrationFields)[0]).toEqual('email')
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
      'paperFileNumberInvalidErrorMessage',
    )
    expect(validate.errors.first('email')).toEqual('emailInvalidErrorMessage')
  })

  // it('Show correct error message when passing invalid fields', () => {
  //   const vals = {
  //     fullName: 'John Li',
  //     reason: 'not on the list',
  //   }
  //   const validate = new Validator(vals, RegistrationFields, defaultMessages)
  //   validate.passes()
  //   expect(validate.errors.first('reason')).toEqual('inErrorMessage')
  // })

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
      'selectedDaysCountErrorMessage',
    )
  })

  it('Validates when too many dates have been passed', () => {
    const vals = {
      selectedDays: ['2018-01-01', '2018-01-02', '2018-01-03', '2018-01-04'],
    }

    const validate = new Validator(vals, CalendarFields, defaultMessages)

    validate.passes()

    expect(validate.errors.first('selectedDays')).toEqual(
      'selectedDaysCountErrorMessage',
    )
  })

  it('Validates when correct amount of dates have been passed', () => {
    const vals = {
      selectedDays: ['2018-01-01'],
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
    expect(validate.errors.all().emailConfirm[0]).toEqual('emailConfirmErrorMessage')
  })

  it('Gives back an first error in the array for each key', () => {
    const vals = {}

    const validate = new Validator(vals, RegistrationFields, defaultMessages)
    validate.passes()
    expect(getFieldErrorStrings(validate)['emailConfirm']).toEqual(
      'emailConfirmErrorMessage',
    )
  })

  it('Gets ar array of field names from Object Keys', () => {
    expect(getFieldNames(RegistrationFields)[0]).toEqual('email')
    expect(getFieldNames(CalendarFields)[0]).toEqual('selectedDays')
  })

  it('Handles whitespace', () => {
    const vals = {
      fullName: 'John Li',
      email: 'test@test.com ',
    }

    const validate = new Validator(vals, RegistrationFields, defaultMessages)
    const success = validate.passes()

    expect(success).toEqual(false)

    expect(validate.errors.first('email')).toEqual('emailInvalidErrorMessage')
  })

  it('Fails to validate if 1 date passed', () => {
    const vals = {
      selectedDays: ['2018-01-01', '2018-01-01'],
    }

    const validate = new Validator(vals, CalendarFields, defaultMessages)
    const passed = validate.passes()
    expect(passed).toEqual(false)
  })

  it('Shows correct error message for 0 dates passed', () => {
    const vals = {
      selectedDays: [],
    }

    const validate = new Validator(vals, CalendarFields, defaultMessages)
    validate.passes()
    expect(validate.errors.first('selectedDays')).toEqual(
      'selectedDaysEmptyErrorMessage',
    )
  })

  it('Shows correct error message for 1 date passed', () => {
    const vals = {
      selectedDays: ['2018-01-02', '2018-01-02'],
    }

    const validate = new Validator(vals, CalendarFields, defaultMessages)
    validate.passes()
    expect(validate.errors.first('selectedDays')).toEqual(
      'selectedDaysCountErrorMessage',
    )
  })

  it('Shows correct error message for 2 dates passed', () => {
    const vals = {
      selectedDays: ['2018-01-02', '2018-01-03'],
    }

    const validate = new Validator(vals, CalendarFields, defaultMessages)
    validate.passes()
    expect(validate.errors.first('selectedDays')).toEqual(
      'selectedDaysCountErrorMessage',
    )
  })
})
