import addWeeks from 'date-fns/add_weeks'
import parse from 'date-fns/parse'
import isWednesday from 'date-fns/is_wednesday'
import isThursday from 'date-fns/is_thursday'
import startOfMonth from 'date-fns/start_of_month'
import addDays from 'date-fns/add_days'
import subWeeks from 'date-fns/sub_weeks'
import format from 'date-fns/format'
import { makeGMTDate, dateToISODateString } from '../components/Time'

// Go 6 weeks from today (ie, add 28 days)
const offsetStartWeeks = 6
// Count 8 weeks from that point (ie, add 56 days)
const offsetEndWeeks = 8

const offsetRespondBy = 6 // weeks

export const getStartDate = (today = new Date(), parseToDate = false) => {
  const date = wedOrThurs(addWeeks(today, offsetStartWeeks))
  return parseToDate ? parse(date) : dateToISODateString(date)
}

export const getEndDate = (today = new Date()) => {
  const endDate = dateToISODateString(
    addWeeks(new Date(getStartDate(today)), offsetEndWeeks),
  )

  return endDate
}

export const wedOrThurs = date => {
  let i = 0
  //find the current or next Wed or Thurs
  for (i = 0; i <= 7; i++) {
    let plusDay = addDays(date, i)
    if (isWednesday(plusDay) || isThursday(plusDay)) {
      break
    }

    i++
  }

  return parse(addDays(date, i))
}

export const getStartMonth = (today = new Date()) => {
  const baseDate = parse(getStartDate(today))
  return startOfMonth(wedOrThurs(baseDate))
}

export const getStartMonthName = (today = new Date(), locale = 'fr') => {
  const baseDate = parse(getStartMonth(today))

  const options = {
    month: 'long',
  }

  return makeGMTDate(format(baseDate, 'YYYY-MM-DD')).toLocaleDateString(
    locale,
    options,
  )
}

const toLocale = (date, options, locale) => {
  return makeGMTDate(format(date, 'YYYY-MM-DD')).toLocaleDateString(
    locale,
    options,
  )
}

export const getEndMonthName = (today = new Date(), locale = 'fr') => {
  const options = { month: 'long' }
  return toLocale(parse(getEndDate(today)), options, locale)
}

export const getMonthNameAndYear = (date, locale = 'fr') => {
  const options = { month: 'long', year: 'numeric' }
  return toLocale(format(parse(date), 'YYYY-MM-DD'), options, locale)
}

export const toMonth = (today = new Date(), parseToDate = true) => {
  const endDate = getEndDate(today)
  return parseToDate ? parse(endDate) : endDate
}

export const respondByDate = (selectedDays = [], locale = 'fr') => {
  if (!selectedDays[selectedDays.length - 1]) return null

  const baseDate = subWeeks(
    parse(selectedDays[selectedDays.length - 1]),
    offsetRespondBy,
  )
  const options = { month: 'long', day: 'numeric', year: 'numeric' }
  return toLocale(format(baseDate, 'YYYY-MM-DD'), options, locale)
}

export const yearMonthDay = date => {
  return format(date, 'YYYY-MM-DD')
}
