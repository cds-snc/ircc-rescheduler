import React from 'react'
import PropTypes from 'prop-types'

/*
  check if passed-in variable is a string
  source: https://stackoverflow.com/a/9436948/9728185
*/
const _isString = v => typeof v === 'string' || v instanceof String

/*
  Unbelievably, we need to do this to get javascript's Date string functions
  to reliably print out the days that we've selected on the calendar.
  When dates are selected, a timezone is automatically created for the date,
  based on the Locale.
  Once you print the date, it will apply the timezone transformation and
  possibly return a different date as a string representation.

  For example, you might get:
  var d = new Date("2018-06-05").toString()
  Mon Jun 04 2018 20:00:00 GMT-0400 (EDT)

  So by converting to UTC time, we offset the local timezone and can reliably
  call string methods on our Date object. Amazing.

  eg:
  var d = _convertDateToUTC(new Date("2018-06-05")).toString()
  Tue Jun 05 2018 00:00:00 GMT-0400 (EDT)

  source: https://stackoverflow.com/a/14006555/9728185
*/
const _convertDateToUTC = date => {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  )
}

const makeDate = date =>
  _isString(date) ? _convertDateToUTC(new Date(date)) : date

const dateToHTMLString = date => {
  date = makeDate(date)

  return date.toDateString()
}

const dateToISODateString = date => {
  date = makeDate(date)

  /*
  YYYY-MM-DD from "a valid date string"
  ie, 2011-11-18
  source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time#Valid_datetime_Values
  */
  return date.toISOString().slice(0, 'YYYY-MM-DD'.length)
}

const Time = ({ date }) => (
  <time dateTime={dateToISODateString(date)}>{dateToHTMLString(date)}</time>
)
Time.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired,
}

export { Time as default, makeDate, dateToISODateString }
