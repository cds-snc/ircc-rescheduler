import { dateToISODateString } from '../components/Time'
import addWeeks from 'date-fns/add_weeks'
import parse from 'date-fns/parse'
import isWednesday from 'date-fns/is_wednesday'
import isThursday from 'date-fns/is_thursday'
import startOfMonth from 'date-fns/start_of_month'
import { addDays } from 'date-fns'
import format from 'date-fns/format'

// Go 4 weeks from today (ie, add 28 days)
const offsetStartWeeks = 4
// Count 8 weeks from that point (ie, add 56 days)
const offsetEndWeeks = 8

export const getStartDate = (today = new Date()) => {
  const startDate = dateToISODateString(addWeeks(today, offsetStartWeeks))
  return startDate
}

export const getEndDate = (today = new Date()) => {
  const endDate = dateToISODateString(
    addWeeks(new Date(getStartDate(today)), offsetEndWeeks),
  )

  return endDate
}

export const getStartMonth = (today = new Date()) => {
  const baseDate = parse(getStartDate(today))

  let i = 0
  //find the current or next Wed or Thurs
  for (i = 0; i <= 7; i++) {
    let plusDay = addDays(baseDate, i)
    if (isWednesday(plusDay) || isThursday(plusDay)) {
      break
    }

    i++
  }

  return startOfMonth(parse(addDays(baseDate, i)))
}

export const getStartMonthName = (today = new Date()) => {
  const baseDate = parse(getStartMonth(today))
  return format(baseDate, 'MMMM')
}

export const getEndMonthName = (today = new Date()) => {
  const baseDate = parse(getEndDate(today))
  return format(baseDate, 'MMMM')
}

export const toMonth = (today = new Date(), parseToDate = true) => {
  const endDate = getEndDate(today)
  return parseToDate ? parse(endDate) : endDate
}

export const yearMonthDay = date => {
  return format(date, 'YYYY-MM-DD')
}
