import React, { Component } from 'react'
import format from 'date-fns/format'
import eachDay from 'date-fns/each_day'
import isWednesday from 'date-fns/is_wednesday'
import isThursday from 'date-fns/is_thursday'
import addWeeks from 'date-fns/add_weeks'
import { css } from 'react-emotion'
import { theme } from '../styles'
import { Checkbox } from '../components/forms/MultipleChoice'

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

const column = css`
  border-left: 2px solid black;
  padding: 0 ${theme.spacing.xxxl} 0 ${theme.spacing.lg};
`

const Calendar = ({ startDate, endDate }) => {
<<<<<<< HEAD
=======
  // all days in a month
>>>>>>> update date output + code cleanup
  const days = eachDay(startDate, endDate)
  let prevMonthName = ''
  return (
    <ul className={column}>
      {days.map((date, index) => {
        const monthName = format(date, 'MMMM')
        const label = format(date, 'dddd MMMM D')
        const idMonth = format(date, 'MM')
        const validDay = isWednesday(date) || isThursday(date)
        let closeTag
        let monthHeader = ''
<<<<<<< HEAD

        // @todo - endTag and closeTag this logic will get months into columns but unable to pass a conditional close only tag at this point

=======
>>>>>>> update date output + code cleanup
        let endTag = index === days.length - 1 ? <br /> : null

        if (validDay) {
          monthHeader =
            monthName !== prevMonthName ? <h2>{monthName}</h2> : null

          closeTag = monthHeader && prevMonthName !== '' ? <br /> : null

          prevMonthName = monthName
        }

<<<<<<< HEAD
        const val = dateToString(date)

        if (validDay) {
          return (
            <React.Fragment key={val}>
              {closeTag}
              {monthHeader}
              <li>
                <Checkbox
                  name="selectedDays[]"
                  id={`calendar-${idMonth}-${index}`}
                  value={val}
=======
        if (validDay) {
          return (
            <React.Fragment>
              {closeTag}
              {monthHeader}
              <li key={index}>
                <Checkbox
                  name="selectedDays[]"
                  id={`calendar-${idMonth}-${index}`}
                  value={dateToString(date)}
>>>>>>> update date output + code cleanup
                  label={label}
                />
              </li>
            </React.Fragment>
          )
        }

        return endTag
      })}
    </ul>
  )
}

Calendar.propTypes = {
  startDate: isValidDateString,
  endDate: isValidDateString,
}

// Go 4 weeks from today (ie, add 28 days)
// Count 8 weeks from that point (ie, add 56 days)
class CalendarNoJs extends Component {
  render() {
    const startDate = dateToString(addWeeks(new Date(), 4))
    const endDate = dateToString(addWeeks(new Date(startDate), 8))
<<<<<<< HEAD
    return <Calendar startDate={startDate} endDate={endDate} />
=======
    return (
      <React.Fragment>
        <Calendar startDate={startDate} endDate={endDate} />
      </React.Fragment>
    )
>>>>>>> update date output + code cleanup
  }
}

export default CalendarNoJs