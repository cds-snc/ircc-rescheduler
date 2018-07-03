import {
  getStartDate,
  getEndDate,
  getStartMonth,
  toMonth,
  yearMonthDay,
} from '../calendarDates'

describe('Utilities functions CalendarDates.js', () => {
  it('gets correct start date', () => {
    const today = new Date('July 05, 2018')
    expect(getStartDate(today)).toEqual('2018-08-02')
  })

  it('gets correct end date', () => {
    const today = new Date('July 05, 2018')
    expect(getEndDate(today)).toEqual('2018-09-27')
  })

  it('gets start month', () => {
    const today = new Date('September 05, 2018')
    expect(yearMonthDay(getStartMonth(today))).toEqual('2018-10-01')
  })

  it('gets to month', () => {
    const today = new Date('September 05, 2018')
    expect(toMonth(today, false)).toEqual('2018-11-28')
  })
})
