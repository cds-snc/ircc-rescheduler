import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'lingui-react'
import FieldAdapterPropTypes from './_Field'
import DayPicker, { DateUtils } from 'react-day-picker'
import { css } from 'emotion'
import Time, { makeGMTDate } from './Time'
import ErrorMessage from './ErrorMessage'
import { theme, mediaQuery, incrementColor } from '../styles'

const dayPickerDefault = css`
  /* DayPicker styles */

  display: inline-block;

  .DayPicker-wrapper {
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding-bottom: 1rem;
    flex-direction: row;
  }

  .DayPicker-Months {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .DayPicker-Month {
    display: table;
    border-collapse: collapse;
    border-spacing: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin: 0 1rem;
    margin-top: 1rem;
  }

  .DayPicker-NavBar {
  }

  .DayPicker-NavButton {
    position: absolute;
    cursor: pointer;
    top: 1rem;
    right: 1.5rem;
    margin-top: 2px;
    color: #8b9898;
    width: 1.25rem;
    height: 1.25rem;
    display: inline-block;
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
  }

  .DayPicker-NavButton:hover {
    opacity: 0.8;
  }

  .DayPicker-NavButton--prev {
    margin-right: 1.5rem;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAVVJREFUWAnN2G0KgjAYwPHpGfRkaZeqvgQaK+hY3SUHrk1YzNLay/OiEFp92I+/Mp2F2Mh2lLISWnflFjzH263RQjzMZ19wgs73ez0o1WmtW+dgA01VxrE3p6l2GLsnBy1VYQOtVSEH/atCCgqpQgKKqYIOiq2CBkqtggLKqQIKgqgCBjpJ2Y5CdJ+zrT9A7HHSTA1dxUdHgzCqJIEwq0SDsKsEg6iqBIEoq/wEcVRZBXFV+QJxV5mBtlDFB5VjYTaGZ2sf4R9PM7U9ZU+lLuaetPP/5Die3ToO1+u+MKtHs06qODB2zBnI/jBd4MPQm1VkY79Tb18gB+C62FdBFsZR6yeIo1YQiLJWMIiqVjQIu1YSCLNWFgijVjYIuhYYCKoWKAiiFgoopxYaKLUWOii2FgkophYp6F3r42W5A9s9OcgNvva8xQaysKXlFytoqdYmQH6tF3toSUo0INq9AAAAAElFTkSuQmCC');
  }

  .DayPicker-NavButton--next {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAXRJREFUWAnN119ugjAcwPHWzJ1gnmxzB/BBE0n24m4xfNkTaOL7wOtsl3AXMMb+Vjaa1BG00N8fSEibPpAP3xAKKs2yjzTPH9RAjhEo9WzPr/Vm8zgE0+gXATAxxuxtqeJ9t5tIwv5AtQAApsfT6TPdbp+kUBcgVwvO51KqVhMkXKsVJFXrOkigVhCIs1Y4iKlWZxB1rX4gwlpRIIpa8SDkWmggrFq4IIRaJKCYWnSgnrXIQV1r8YD+1Vrn+bReagysIFfLABRt31v8oBu1xEBttfRbltmfjgEcWh9snUS2kNdBK6WN1vrOWxObWsz+fjxevsxmB1GQDfINWiev83nhaoiB/CoOU438oPrhXS0WpQ9xc1ZQWxWHqUYe0I0qrKCQKjygDlXIQV2r0IF6ViEBxVTBBSFUQQNhVYkHIVeJAtkNsbQ7c1LtzP6FsObhb2rCKv7NBIGoq4SDmKoEgTirXAcJVGkFSVVpgoSrXICGUMUH/QBZNSUy5XWUhwAAAABJRU5ErkJggg==');
  }

  .DayPicker-NavButton--interactionDisabled {
    display: none;
  }

  .DayPicker-Caption {
    padding: 0 0.5rem;
    display: table-caption;
    text-align: left;
    margin-bottom: 0.5rem;
  }

  .DayPicker-Caption > div {
    font-size: 1.15rem;
    font-weight: 500;
  }

  .DayPicker-Weekdays {
    margin-top: 1rem;
    display: table-header-group;
  }

  .DayPicker-WeekdaysRow {
    display: table-row;
  }

  .DayPicker-Weekday {
    display: table-cell;
    padding: 0.5rem;
    font-size: 0.875em;
    text-align: center;
    color: #8b9898;
  }

  .DayPicker-Weekday abbr[title] {
    border-bottom: none;
    text-decoration: none;
  }

  .DayPicker-Body {
    display: table-row-group;
  }

  .DayPicker-Week {
    display: table-row;
  }

  .DayPicker-Day {
    display: table-cell;
    padding: 0.5rem;
    text-align: center;
    cursor: pointer;
    vertical-align: middle;
    outline: none;
  }

  .DayPicker-WeekNumber {
    display: table-cell;
    padding: 0.5rem;
    text-align: right;
    vertical-align: middle;
    min-width: 1rem;
    font-size: 0.75em;
    cursor: pointer;
    color: #8b9898;
    border-right: 1px solid #eaecec;
  }

  .DayPicker--interactionDisabled .DayPicker-Day {
    cursor: default;
  }

  .DayPicker-Footer {
    padding-top: 0.5rem;
  }

  .DayPicker-TodayButton {
    border: none;
    background-image: none;
    background-color: transparent;
    box-shadow: none;
    cursor: pointer;
    color: #4a90e2;
    font-size: 0.875em;
  }

  /* Default modifiers */

  .DayPicker-Day--outside {
    cursor: default;
    color: #8b9898;
  }

  .DayPicker-Day--disabled {
    color: #dce0e0;
    cursor: default;
  }
`

const dayPicker = css`
  .DayPicker-wrapper {
    background-color: white;
    font-size: ${theme.font.lg};
    border: 2px solid ${theme.colour.greyLight};
  }

  .DayPicker-NavButton {
    top: 1.5rem;
    right: auto;
    color: ${theme.colour.black};
    width: 1.35rem;
    height: 1.35rem;
    background-size: 50%;

    &:focus {
      outline: 3px solid ${theme.colour.focus};
      outline-offset: 2px;
    }

    &.DayPicker-NavButton--next {
      right: 2.5rem;
    }

    &.DayPicker-NavButton--prev {
      left: 2.5rem;
    }
  }

  .DayPicker-Weekday,
  .DayPicker-Day {
    padding: 0.7rem;
  }

  .DayPicker-Caption {
    border-bottom: 2px dotted black;
    text-align: center;
    padding: ${theme.spacing.sm};

    > div {
      font-weight: 700;
    }
  }

  .DayPicker-Day {
    /* enabled dates */
    &[aria-disabled='false'] {
      font-weight: 700;

      &:focus {
        outline: 3px solid ${theme.colour.focus};
        outline-offset: -2px;
      }
      &:hover {
        background-color: ${theme.colour.greyLight};
      }
    }

    /* disabled dates */
    &[aria-disabled='true'] {
      cursor: not-allowed;

      &:focus {
        outline: 3px solid ${theme.colour.lightGrey};
        outline-offset: -2px;
      }
    }
  }

  /* selected dates */
  .DayPicker-Day--selected:not([aria-disabled='true']):not(.DayPicker-Day--outside) {
    background-color: ${theme.colour.blue};
    color: ${theme.colour.white};

    &:hover {
      background-color: ${incrementColor(theme.colour.blue, 30)};
    }
  }
`

const calendarContainer = css`
  display: inline-flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;

  > div:first-of-type {
    width: 25em;
    margin-right: ${theme.spacing.xxl};
  }
  > div:last-of-type {
    width: 22em;
  }

  ${mediaQuery.lg(css`
    display: block;
  `)};

  ${mediaQuery.md(css`
    > div:first-of-type,
    > div:last-of-type {
      width: 100%;
    }
  `)};

  #selectedDays {
    margin: ${theme.spacing.md} 0;
  }
`

const dayBox = css`
  margin-bottom: ${theme.spacing.md};
  display: flex;
  justify-content: space-between;

  .day-box {
    font-size: ${theme.font.lg};
    width: 12em;
    display: inline-block;
    border: 2px solid ${theme.colour.grey};
    background-color: ${theme.colour.white};
    padding: ${theme.spacing.sm} 0;
    text-align: center;

    &.empty {
      background-color: ${theme.colour.greyLight};
      border: 2px solid ${theme.colour.greyLight};

      * {
        visibility: hidden;
      }
    }
  }

  button {
    font-size: ${theme.font.md};
    text-decoration: underline;
    color: ${theme.colour.link};
    background-color: transparent;
    border: 0;
    cursor: pointer;

    &:focus {
      outline-offset: 2px;
      outline: 3px solid ${theme.colour.focus};
    }
  }
`

const renderDayBoxes = ({
  dayLimit,
  selectedDays,
  removeDayOnClickOrKeyPress,
}) => {
  let dayBoxes = []
  for (let i = 0; i < dayLimit; i++) {
    let selectedDay = selectedDays[i] // eslint-disable-line security/detect-object-injection
    dayBoxes.push(
      selectedDay ? (
        <li key={i} className={dayBox}>
          <span className="day-box">
            <Time date={selectedDay} />
          </span>
          <button
            type="button"
            onClick={removeDayOnClickOrKeyPress(selectedDay)}
            onKeyPress={removeDayOnClickOrKeyPress(selectedDay)}
          >
            <Trans>Remove date</Trans>
          </button>
        </li>
      ) : (
        <li key={i} className={dayBox}>
          <span className="empty day-box">
            <span>No date selected</span>
          </span>
        </li>
      ),
    )
  }
  return dayBoxes
}

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.removeDayOnClickOrKeyPress = this.removeDayOnClickOrKeyPress.bind(this)
    this.state = {
      errorMessage: null,
    }
  }

  removeDayOnClickOrKeyPress = day => e => {
    /*
      Remove the selected day from the internal state when
      - there has been a real click event (ie, e.detail > 0)
      - the spacebar or enter key is pressed
    */
    if (
      (e.type === 'click' && e.detail !== 0) ||
      ((e.type === 'keypress' && e.key === 'Enter') || e.key === ' ')
    ) {
      this.handleDayClick(day, { selected: true })
    }
  }

  /*
    'selected' is a boolean field
    - true if the day being passed in has already been selected on the calendar
    - false if the day being passed in is not already on the calendar

    'disabled' is a boolean field as well
    - true if the day being passed in is disabled (not able to be selected)
    - else false

    These properties are part of the DayPicker API
    http://react-day-picker.js.org/examples/selected-multiple
  */
  async handleDayClick(day, { selected, disabled }) {
    if (disabled) {
      return
    }

    /* Cast all Dates to 12 noon GMT */
    day = makeGMTDate(day)

    let { dayLimit } = this.props

    const selectedDays = this.props.input.value || []

    // !selected means that this current day is not marked as 'selected' on the calendar
    if (!selected) {
      // If we have already selected the maximum number of days,
      // add an error message to the internal state and then return early
      if (selectedDays.length >= dayLimit) {
        await this.setState({
          errorMessage: (
            <Trans>
              You have already selected the maximum number of dates!
            </Trans>
          ),
        })
        this.errorContainer.focus()
        return
      }

      // push new day into array of selectedDays
      selectedDays.push(day)
    } else {
      // If we have already selected this day, unselect it
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day),
      )
      selectedDays.splice(selectedIndex, 1)
    }

    this.props.input.value = selectedDays
    this.props.input.onChange(this.props.input.value)
    await this.setState({
      errorMessage: null,
    })
  }

  render() {
    let {
      input: { onBlur, onFocus, value },
      dayLimit,
    } = this.props
    value = value || []
    return (
      <div className={calendarContainer}>
        <DayPicker
          className={css`
            ${dayPickerDefault} ${dayPicker};
          `}
          initialMonth={new Date(2018, 5)}
          fromMonth={new Date(2018, 5)}
          toMonth={new Date(2018, 6)}
          numberOfMonths={1}
          disabledDays={[{ daysOfWeek: [0, 1, 3, 4, 6] }]}
          onDayClick={this.handleDayClick}
          selectedDays={value}
          onFocus={() => onFocus(value)}
          onBlur={() => onBlur(value)}
        />
        <div>
          <h3>Dates selected:</h3>
          <div
            tabIndex="-1"
            ref={errorContainer => {
              this.errorContainer = errorContainer
            }}
          >
            <ErrorMessage
              message={this.state.errorMessage}
              id="selectedDays-error"
            />
          </div>

          <ul id="selectedDays">
            {renderDayBoxes({
              dayLimit,
              selectedDays: value,
              removeDayOnClickOrKeyPress: this.removeDayOnClickOrKeyPress,
            })}
          </ul>
        </div>
      </div>
    )
  }
}
Calendar.propTypes = {
  ...FieldAdapterPropTypes,
  dayLimit: PropTypes.number.isRequired,
}

export { Calendar as CalendarAdapter }
