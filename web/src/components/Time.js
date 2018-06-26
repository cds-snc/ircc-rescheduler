import React from 'react'
import PropTypes from 'prop-types'

/*
  Convert all dates casted to 12:00:00 for the DayPicker
  https://github.com/gpbl/react-day-picker/issues/199
*/
const makeGMTDate = date => {
  return new Date(
    new Date(date).toISOString().slice(0, 'YYYY-MM-DD'.length) +
      'T12:00:00.000Z',
  )
}

const dateToHTMLString = (date, locale) => {
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return makeGMTDate(date).toLocaleDateString(locale, options)
}

const dateToISODateString = date => {
  /*
    YYYY-MM-DD from "a valid date string"
    ie, 2011-11-18
    source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time#Valid_datetime_Values
  */
  return makeGMTDate(date)
    .toISOString()
    .slice(0, 'YYYY-MM-DD'.length)
}

const Time = ({ date, locale }) => (
  <time dateTime={dateToISODateString(date)}>
    {dateToHTMLString(date, locale)}
  </time>
)
Time.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired,
  locale: PropTypes.string,
}

export { Time as default, makeGMTDate, dateToISODateString }
