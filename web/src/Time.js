import React from 'react'
import PropTypes from 'prop-types'

/*
  check if passed-in variable is a string
  source: https://stackoverflow.com/a/9436948/9728185
*/
const _isString = v => typeof v === 'string' || v instanceof String

const dateToHTMLString = date => {
  date = _isString(date) ? new Date(date) : date
  return date.toDateString()
}

const dateToISODateString = date => {
  date = _isString(date) ? new Date(date) : date

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

export { Time as default, dateToISODateString }
