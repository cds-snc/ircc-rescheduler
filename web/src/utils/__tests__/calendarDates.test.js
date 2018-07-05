import {
  getStartDate,
  getEndDate,
  getStartMonth,
  toMonth,
  yearMonthDay,
  respondByDate,
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

  it('gets start month', () => {
    const today = new Date('September 05, 2018')
    expect(yearMonthDay(getStartMonth(today))).toEqual('2018-10-01')
  })

  it('gets to month', () => {
    const today = new Date('September 05, 2018')
    expect(toMonth(today, false)).toEqual('2018-12-05')
  })

  it('gets confirmation date', () => {
    const selectedDays = ['2018-01-31', '2018-01-30', '2018-08-22']
    expect(respondByDate(selectedDays, 'en')).toEqual('July 27, 2018')
  })

  it('gets confirmation date if passed out of order', () => {
    const selectedDays = ['2018-01-31', '2018-08-22', '2018-01-30']
    expect(respondByDate(selectedDays, 'en')).toEqual('July 27, 2018')
  })

  it('returns null if selectedDays value(s) not passed', () => {
    const selectedDays = []
    expect(respondByDate(selectedDays, 'en')).toEqual(null)
  })
})
