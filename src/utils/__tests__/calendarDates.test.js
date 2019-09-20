import {
  // getStartDate,
  // getEndDate,
  getStartMonth,
  yearMonthDay,
  getMonthNameAndYear,
  getInitialMonth,
  checkLocationDays,
  getDaysOfWeekForLocation,
  dateSetFromString,
} from '../calendarDates'

// describe('Utilities functions CalendarDates.js', () => {
//   it('gets correct start date', () => {
//     const today = new Date('July 07, 2018')
//     expect(getStartDate(today)).toEqual('2018-08-15')
//   })

// it('gets correct end date', () => {
//   const today = new Date('July 05, 2018')
//   expect(getEndDate(today)).toEqual('2018-10-10')
// })

it('gets month and year', () => {
  const today = new Date('July 05, 2018')
  expect(getMonthNameAndYear(today, 'en')).toEqual('July 2018')
})

it('gets month and year FR', () => {
  const today = new Date('July 05, 2018')
  expect(getMonthNameAndYear(today, 'fr')).toEqual('juillet 2018')
})

it('gets start month', () => {
  const today = new Date('October 10 2018')
  expect(yearMonthDay(getStartMonth(today))).toEqual('2018-10-01')
})

it('defaults to startMonth if no dates are passed', () => {
  const today = new Date()
  const result = getInitialMonth([], today)
  expect(result).toEqual(today)
})

it('return startMonth if bad date is passed', () => {
  const today = new Date()
  const result = getInitialMonth('hey', today)
  expect(result).toEqual(today)
})

it('returns startMonth if bad date is passed as array', () => {
  const today = new Date()
  const result = getInitialMonth(['hey'], today)
  expect(result).toEqual(today)
})

it('returns startMonth if date is in the past', () => {
  const today = new Date()
  const selected = new Date('Sunday, November 3, 1957')
  const result = getInitialMonth([selected], today)
  expect(result).toEqual(today)
})

it('gets valid days for location', () => {
  const location = {
    recurring: {
      sep: ['wed', 'thurs', 'fri'],
      oct: ['tues', 'thurs'],
      nov: ['mon', 'fri'],
    },
  }

  const date2 = checkLocationDays(
    location,
    'sep',
    new Date('Monday, September 3, 2018'),
  )

  expect(date2.valid).toEqual(false)
})

it('gets days of week for location', () => {
  const location = {
    recurring: {
      sep: ['wed', 'thurs', 'fri'],
      oct: ['tues', 'thurs'],
      nov: ['mon', 'fri'],
    },
  }

  const result = getDaysOfWeekForLocation(
    location,
    new Date('Monday, September 3, 2018'),
  )

  expect(result).toEqual([4, 5, 6])
})

it('Creates a dateset', () => {
  const set = dateSetFromString('2018-10-02, 2018-10-03')
  expect(set.has('2018-10-03')).toEqual(true)
})

it('Handles when no date string is passed in', () => {
  const set = dateSetFromString()
  expect(set.has('2018-10-03')).toEqual(false)
})

it('Handles single date string', () => {
  const set = dateSetFromString('2018-10-03')
  expect(set.has('2018-10-03')).toEqual(true)
})
// })
