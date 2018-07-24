import {
  getStartDate,
  getEndDate,
  getStartMonth,
  toMonth,
  yearMonthDay,
  respondByDate,
  getMonthNameAndYear,
  getInitialMonth,
} from '../calendarDates'

describe('Utilities functions CalendarDates.js', () => {
  it('gets correct start date', () => {
    const today = new Date('July 07, 2018')
    expect(getStartDate(today)).toEqual('2018-08-15')
  })

  it('gets correct end date', () => {
    const today = new Date('July 05, 2018')
    expect(getEndDate(today)).toEqual('2018-10-04')
  })

  it('gets month and year', () => {
    const today = new Date('July 05, 2018')
    expect(getMonthNameAndYear(today, 'en')).toEqual('July 2018')
  })

  it('gets month and year FR', () => {
    const today = new Date('July 05, 2018')
    expect(getMonthNameAndYear(today, 'fr')).toEqual('juillet 2018')
  })

  it('gets start month', () => {
    const today = new Date('September 05, 2018')
    expect(yearMonthDay(getStartMonth(today))).toEqual('2018-10-01')
  })

  it('gets to month', () => {
    const today = new Date('September 05, 2018')
    expect(toMonth(today)).toEqual('2018-12-05')
  })

  it('gets confirmation date', () => {
    const selectedDays = ['2018-01-31', '2018-01-30', '2018-08-22']
    expect(respondByDate(selectedDays, 'en')).toEqual('July 27, 2018')
  })

  it('gets confirmation date FR', () => {
    const selectedDays = ['2018-01-31', '2018-01-30', '2018-08-22']
    expect(respondByDate(selectedDays, 'fr')).toEqual('27 juillet 2018')
  })

  it('gets confirmation date if passed out of order', () => {
    const selectedDays = ['2018-01-31', '2018-08-22', '2018-01-30']
    expect(respondByDate(selectedDays, 'en')).toEqual('July 27, 2018')
  })

  it('returns null if selectedDays value(s) not passed', () => {
    const selectedDays = []
    expect(respondByDate(selectedDays, 'en')).toEqual(null)
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

  it('returns startMonth if bad date is passed as array', () => {
    const today = new Date()
    const selected = new Date('Aug 1, 2018');
    const result = getInitialMonth([selected], today)
    expect(result).toEqual(selected)
  })
})
