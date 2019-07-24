import React from 'react'
import addWeeks from 'date-fns/add_weeks'
import parse from 'date-fns/parse'
import startOfMonth from 'date-fns/start_of_month'
import addDays from 'date-fns/add_days'
import format from 'date-fns/format'
import eachDay from 'date-fns/each_day'
import isPast from 'date-fns/is_past'
import isMonday from 'date-fns/is_monday'
import isTuesday from 'date-fns/is_tuesday'
import isWednesday from 'date-fns/is_wednesday'
import isThursday from 'date-fns/is_thursday'
import isFriday from 'date-fns/is_friday'
import { makeGMTDate, dateToISODateString } from '../components/Time'
import { getGlobalLocation } from '../locations/'
import { Trans } from '@lingui/react'

const offsetStartWeeks = 5
const offsetEndWeeks = 8

export const toLocale = (date, options, locale) => {
  return makeGMTDate(format(date, 'YYYY-MM-DD')).toLocaleDateString(
    locale,
    options,
  )
}

/*--------------------------------------------*
 * General Date Checks
 *--------------------------------------------*/

export const getStartDate = (today = new Date()) => {
  const date = firstValidDay(undefined, addWeeks(today, offsetStartWeeks))
  return dateToISODateString(date)
}

export const getEndDate = (today = new Date()) => {
  const endDate = dateToISODateString(
    addWeeks(new Date(getStartDate(today)), offsetEndWeeks),
  )

  return endDate
}

export const getStartMonth = (today = new Date()) => {
  return startOfMonth(parse(getStartDate(today)))
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

/*--------------------------------------------*
 * Day Checks
 *--------------------------------------------*/

/*
   Looks for first day in a month that
   is valid for a location
*/
export const firstValidDay = (location = getGlobalLocation(), date) => {
  var i = 0
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

const isValidDayForLocation = (
  location = getGlobalLocation(),
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

/*
 Turns month input ['wed', 'thurs']
 into numeric equivalent [ 4, 5 ]
 */
export const getDaysOfWeekForLocation = (
  location = getGlobalLocation(),
  date = new Date(),
) => {
  const month = getShortMonthName(date)
  const daysOfWeek = []
  // eslint-disable-next-line security/detect-object-injection
  if (location && location.recurring[month]) {
    // eslint-disable-next-line security/detect-object-injection
    location.recurring[month].forEach(day => {
      /* pass in a day string 'wed' and get a day number 4 */
      const result = isValidDayString(day)
      if (result.dayOfWeek) {
        daysOfWeek.push(result.dayOfWeek)
      }
    })

    return daysOfWeek
  }

  return []
}

export const getDisabledDays = (
  location = getGlobalLocation(),
  date = new Date(),
) => {
  const startDate = parse(getStartDate(date))
  const endDate = parse(getEndDate(date))
  return getAllowedDays(location, startDate, endDate, true)
}

export const getEnabledDays = (
  location = getGlobalLocation(),
  date = new Date(),
) => {
  const startDate = parse(getStartDate(date))
  const endDate = parse(getEndDate(date))
  return getAllowedDays(location, startDate, endDate)
}

const getAllowedDays = (
  location = getGlobalLocation(),
  startDate,
  endDate,
  disabledDays = false,
) => {
  const days = eachDay(startDate, endDate)
  const mapped = []
  const disabled = []
  days.forEach(date => {
    const month = getShortMonthName(date)
    const validDay = isValidDayForLocation(location, month, date)
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

export const checkLocationDays = (
  location = getGlobalLocation(),
  month,
  date,
) => {
  let valid = false

  const dateSet = dateSetFromString(location.blocked)

  // eslint-disable-next-line security/detect-object-injection
  location.recurring[month].forEach(day => {
    /*
      Check the date against the day check functions
      isMonday, isTuesday
    */
    const result = isDayValid(day, date)
    const dateFormatted = format(date, 'YYYY-MM-DD')

    // checks to see if a day is valid and that it's not blocked
    // weekends are blocked automatically
    if (result.valid && !dateSet.has(dateFormatted)) {
      valid = result.valid
    }
  })

  return { valid }
}

/*
  Check to see if day input is in the correct format
  thurs not thursday

  ['wed', 'thurs'],
*/
const isValidDayString = day => {
  return isDay(day)
}

const isDayValid = (day, date) => {
  return isDay(day, date)
}

export const isDay = (day, date) => {
  switch (day) {
    case 'mon':
      return { dayOfWeek: 2, valid: date ? isMonday(date) : undefined }
    case 'tues':
      return { dayOfWeek: 3, valid: date ? isTuesday(date) : undefined }
    case 'wed':
      return { dayOfWeek: 4, valid: date ? isWednesday(date) : undefined }
    case 'thurs':
      return { dayOfWeek: 5, valid: date ? isThursday(date) : undefined }
    case 'fri':
      return { dayOfWeek: 6, valid: date ? isFriday(date) : undefined }
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

export const sortSelectedDays = selectedDays => {
  // create a new array because .sort() modifies our original array
  let temp = selectedDays.slice()
  temp.sort((date1, date2) => date1.getTime() - date2.getTime())
  return temp
}

/*--------------------------------------------*
 * Date Formatting
 *--------------------------------------------*/

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

export const getMonthName = (date = new Date(), locale = 'fr') => {
  const options = { month: 'long' }
  return toLocale(format(parse(date)), options, locale)
}

export const getShortMonthName = (date = new Date()) => {
  return format(parse(date), 'MMM').toLowerCase()
}

export const yearMonthDay = date => {
  return format(date, 'YYYY-MM-DD')
}

/*--------------------------------------------*
 * Utility functions to help mark
 * dates as unavailable
 *--------------------------------------------*/

const cachedEnabledDays = () => {
  /* return a cache if we have one*/
  if (cachedEnabledDays.cached) {
    return cachedEnabledDays.cached
  }

  const enabled = getEnabledDays()

  const mapped = {}
  enabled.forEach((day, index) => {
    let val = true
    if (index === 0) {
      val = 'first'
    }

    if (index === enabled.length - 1) {
      val = 'last'
    }

    mapped[yearMonthDay(day)] = val
  })

  cachedEnabledDays.cached = mapped

  return cachedEnabledDays.cached
}

export const notInDateRange = day => {
  const days = cachedEnabledDays()
  if (days[yearMonthDay(day)]) {
    return true
  }

  return false
}

export const isFirstAvailableDay = day => {
  const days = cachedEnabledDays()
  if (days[yearMonthDay(day)] === 'first') {
    return true
  }

  return false
}

export const isLastAvailableDay = day => {
  const days = cachedEnabledDays()
  if (days[yearMonthDay(day)] === 'last') {
    return true
  }

  return false
}

/*--------------------------------------------*
 * Dates from CSV string
 * '2018-10-17, 2018-11-06, 2018-11-07'
 *--------------------------------------------*/

export const dateSetFromString = dates => {
  if (!dates) return new Set()
  dates = dates.split(',')

  dates = dates.map(date => {
    return date.trim()
  })

  return new Set(dates)
}

/*--------------------------------------------*
 * Initial Month
 *--------------------------------------------*/

export const initialMonth = props => {
  let { context: { store: { calendar = {} } = {} } = {} } = props

  // cast values to Date objects if calendar.selectedDays exists and has a length
  if (calendar && calendar.selectedDays && calendar.selectedDays.length) {
    calendar = {
      selectedDays: calendar.selectedDays.map(day => makeGMTDate(day)),
    }
  }

  const startMonth = parse(getStartMonth())
  return getInitialMonth(calendar.selectedDays, startMonth)
}
