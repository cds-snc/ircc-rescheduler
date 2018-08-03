import React from 'react'
import addWeeks from 'date-fns/add_weeks'
import parse from 'date-fns/parse'
import startOfMonth from 'date-fns/start_of_month'
import addDays from 'date-fns/add_days'
import subWeeks from 'date-fns/sub_weeks'
import format from 'date-fns/format'
import eachDay from 'date-fns/each_day'
import isPast from 'date-fns/is_past'
import isMonday from 'date-fns/is_monday'
import isTuesday from 'date-fns/is_tuesday'
import isWednesday from 'date-fns/is_wednesday'
import isThursday from 'date-fns/is_thursday'
import isFriday from 'date-fns/is_friday'
import { makeGMTDate, dateToISODateString } from '../components/Time'
import { vancouver } from '../locations/vancouver'
import { Trans } from 'lingui-react'

const offsetStartWeeks = 5
const offsetEndWeeks = 8
const offsetRespondBy = 4 // weeks + respondByDate() will add 2 additional days

export const toLocale = (date, options, locale) => {
  return makeGMTDate(format(date, 'YYYY-MM-DD')).toLocaleDateString(
    locale,
    options,
  )
}

export const getStartDate = (today = new Date()) => {
  const date = firstValidDay(addWeeks(today, offsetStartWeeks))
  return dateToISODateString(date)
}

export const getEndDate = (today = new Date()) => {
  const endDate = dateToISODateString(
    addWeeks(new Date(getStartDate(today)), offsetEndWeeks),
  )

  return endDate
}

export const firstValidDay = (date, location = vancouver) => {
  var i = 0
  //find the current or next Wed or Thurs
  for (i = 0; i <= 7; i++) {
    let plusDay = addDays(date, i)
    //check for valid day for the location
    const month = getShortMonthName(date)

    if (isValidDayForLocation(location, month, plusDay)) {
      break
    }

    i++
  }

  return parse(addDays(date, i))
}

export const getStartMonth = (today = new Date()) => {
  const baseDate = parse(getStartDate(today))
  return startOfMonth(firstValidDay(baseDate))
}

export const getShortMonthName = (date = new Date()) => {
  return format(parse(date), 'MMM').toLowerCase()
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

export const getEndMonthName = (today = new Date(), locale = 'fr') => {
  const options = { month: 'long' }
  return toLocale(parse(getEndDate(today)), options, locale)
}

export const getMonthNameAndYear = (date, locale = 'fr') => {
  const options = { month: 'long', year: 'numeric' }
  return toLocale(format(parse(date), 'YYYY-MM-DD'), options, locale)
}

export const getMonthName = (date, locale = 'fr') => {
  const options = { month: 'long' }
  return toLocale(format(parse(date)), options, locale)
}

export const toMonth = (today = new Date()) => {
  return getEndDate(today)
}

export const respondByDate = (selectedDays = [], locale = 'fr') => {
  selectedDays.sort()
  if (!selectedDays[selectedDays.length - 1]) return null

  const baseDate = addDays(
    subWeeks(parse(selectedDays[selectedDays.length - 1]), offsetRespondBy),
    2,
  )

  const options = { month: 'long', day: 'numeric', year: 'numeric' }
  return toLocale(format(baseDate, 'YYYY-MM-DD'), options, locale)
}

export const yearMonthDay = date => {
  return format(date, 'YYYY-MM-DD')
}

const isValidDayForLocation = (
  location = {},
  month = '',
  date = new Date(),
) => {
  // eslint-disable-next-line security/detect-object-injection
  if (location && location.recurring[month]) {
    const result = checkLocationDays(location, month, date)
    return result.valid
  }

  return false
}

export const getDaysOfWeekForLocation = (location = vancouver, date = {}) => {
  const month = getShortMonthName(date)
  const daysOfWeek = []
  // eslint-disable-next-line security/detect-object-injection
  if (location && location.recurring[month]) {
    // eslint-disable-next-line security/detect-object-injection
    location.recurring[month].forEach(day => {
      const result = isDay(day, date)
      if (result.dayOfWeek) {
        daysOfWeek.push(result.dayOfWeek)
      }
    })

    return daysOfWeek
  }

  return []
}

const isValidDay = (date, location = vancouver) => {
  const month = getShortMonthName(date)
  return isValidDayForLocation(location, month, date)
}

export const getValidDays = (startDate, endDate, disabledDays = false) => {
  const days = eachDay(startDate, endDate)
  const mapped = []
  const disabled = []
  days.forEach(date => {
    const validDay = isValidDay(date)
    if (validDay) {
      mapped.push(date)
    } else {
      disabled.push(date)
    }
  })

  if (disabledDays) {
    return disabled
  }

  return mapped
}

export const checkLocationDays = (location, month, date) => {
  let valid = false
   // eslint-disable-next-line security/detect-object-injection
  location.recurring[month].forEach(day => {
    const result = isDay(day, date)

    if (result.valid) {
      valid = true
    }
  })

  return { valid }
}

export const isDay = (day, date) => {
  switch (day) {
    case 'mon':
      return { valid: isMonday(date), dayOfWeek: 2 }
    case 'tues':
      return { valid: isTuesday(date), dayOfWeek: 3 }
    case 'wed':
      return { valid: isWednesday(date), dayOfWeek: 4 }
    case 'thurs':
      return { valid: isThursday(date), dayOfWeek: 5 }
    case 'fri':
      return { valid: isFriday(date), dayOfWeek: 6 }
    default:
      return false
  }
}

export const dayFromDayNumber = num => {
  switch (num) {
    case 2:
      return { singular: <Trans>Monday</Trans>, plural: <Trans>Mondays</Trans> }
    case 3:
      return {
        singular: <Trans>Tuesday</Trans>,
        plural: <Trans>Tuesdays</Trans>,
      }
    case 4:
      return {
        singular: <Trans>Wednesday</Trans>,
        plural: <Trans>Wednesdays</Trans>,
      }
    case 5:
      return {
        singular: <Trans>Thursday</Trans>,
        plural: <Trans>Thursdays</Trans>,
      }
    case 6:
      return { singular: <Trans>Friday</Trans>, plural: <Trans>Fridays</Trans> }
    default:
      return false
  }
}

export const getDisabledDays = (date = new Date()) => {
  const startDate = parse(getStartDate(date))
  const endDate = parse(getEndDate(date))
  return getValidDays(startDate, endDate, true)
}

export const sortSelectedDays = selectedDays => {
  // create a new array because .sort() modifies our original array
  let temp = selectedDays.slice()
  temp.sort((date1, date2) => date1.getTime() - date2.getTime())
  return temp
}

export const getInitialMonth = (selectedDates, startMonth) => {
  if (!selectedDates || !Array.isArray(selectedDates)) {
    return startMonth
  }

  const dates = sortSelectedDays(selectedDates)

  if (!dates[0] || isNaN(dates[0].valueOf()) || isPast(dates[0])) {
    return startMonth
  }

  return dates[0]
}
