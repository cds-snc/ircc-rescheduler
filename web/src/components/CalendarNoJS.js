import React, { Component } from 'react'
import format from 'date-fns/format'
import eachDay from 'date-fns/each_day'
import isWednesday from 'date-fns/is_wednesday'
import isThursday from 'date-fns/is_thursday'
import addWeeks from 'date-fns/add_weeks'
import { css } from 'react-emotion'
import { theme, mediaQuery } from '../styles'
import { Checkbox } from '../components/forms/MultipleChoice'
import PropTypes from 'prop-types'

const calList = css`
  display: flex;

  ${mediaQuery.md(css`
    flex-direction: column;
  `)};
`

const column = css`
  border-left: 2px solid black;
  padding: 0 ${theme.spacing.xxxl} 0 ${theme.spacing.lg};
`

const isValidDate = (
  date,
  propName = 'startDate',
  componentName = 'CalendarNoJS',
) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/

  return regEx.test(date)
}

const isValidDateString = (props, propName, componentName) => {
  if (!isValidDate(props['startDate'], propName, componentName)) {
    return new Error(
      'Invalid prop `' +
        propName +
        '` supplied to' +
        ' `' +
        componentName +
        '`. Validation failed.',
    )
  }
}

const dateToString = date => (date ? format(date, 'YYYY-MM-DD') : '')

const Calendar = ({ startDate, endDate, dates }) => {
  const days = eachDay(startDate, endDate)
  const mapped = {}

  days.forEach((date, index) => {
    const validDay = isWednesday(date) || isThursday(date)

    if (validDay) {
      const monthName = format(date, 'MMMM')
      const label = format(date, 'dddd MMMM D')
      const idMonth = format(date, 'MM')
      const val = dateToString(date)
      const checked = dates.includes(val)

      const el = (
        <li key={val}>
          <Checkbox
            name="calendar"
            id={`calendar-${idMonth}-${index}`}
            value={val}
            label={label}
            onChange={() => {}}
            checked={checked}
          />
        </li>
      )

      // eslint-disable-next-line security/detect-object-injection
      let vals = mapped[monthName] || []
      vals.push(el)
      // eslint-disable-next-line security/detect-object-injection
      mapped[monthName] = vals
    }
  })

  /*eslint-disable */
  return (
    <div className={calList}>
      {Object.keys(mapped).map((keyName, keyIndex) => {
        return (
          <ul className={column} key={keyName}>
            <h2>{keyName}</h2>
            {mapped[keyName]}
          </ul>
        )
      })}
    </div>
  )
  /*eslint-enable */
}

Calendar.propTypes = {
  startDate: isValidDateString,
  endDate: isValidDateString,
  dates: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

// Go 4 weeks from today (ie, add 28 days)
// Count 8 weeks from that point (ie, add 56 days)
class CalendarNoJs extends Component {
  render() {
    const { dates } = this.props
    const startDate = dateToString(addWeeks(new Date(), 4))
    const endDate = dateToString(addWeeks(new Date(startDate), 8))

    return (
      <Calendar
        dates={dates && dates.calendar ? dates.calendar : []}
        startDate={startDate}
        endDate={endDate}
      />
    )
  }
}

CalendarNoJs.propTypes = {
  dates: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default CalendarNoJs
