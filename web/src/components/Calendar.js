import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from 'lingui-react'
import FieldAdapterPropTypes from './_Field'
import DayPicker, { DateUtils, LocaleUtils } from 'react-day-picker'
import { css } from 'emotion'
import Time, { makeGMTDate, dateToHTMLString } from './Time'
import ErrorMessage from './ErrorMessage'
import { theme, mediaQuery, incrementColor, focusRing } from '../styles'
import Cancel from '../assets/cancel.svg'
import MobileCancel from '../assets/mobileCancel.svg'
import { getDateInfo } from '../utils/linguiUtils'
import {
  getStartMonth,
  toMonth,
  getMonthNameAndYear,
  getStartDate,
} from '../utils/calendarDates'
import parse from 'date-fns/parse'

const dayPickerDefault = css`
  /* DayPicker styles */

  ${focusRing};
  margin-bottom: ${theme.spacing.xl};
  display: inline-block;

  .DayPicker-wrapper {
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    flex-direction: row;
    font-size: ${theme.font.lg};
    background: ${theme.colour.white};
    border: 2px solid ${theme.colour.black};

    ${mediaQuery.lg(css`
      width: 100%;
      margin-right: 0;
    `)};

    ${mediaQuery.md(css`
      width: 100%;
    `)};
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
    width: 25rem;

    ${mediaQuery.lg(css`
      width: 100%;
    `)};
  }

  .DayPicker-NavBar {
  }

  .DayPicker-NavButton {
    position: absolute;
    cursor: pointer;
    top: 1.5rem;
    right: auto;
    margin-top: 2px;
    color: ${theme.colour.black};
    width: 1.35rem;
    height: 1.35rem;
    display: inline-block;
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;

    &:focus {
      outline: 3px solid ${theme.colour.focus};
      outline-offset: 2px;
    }
  }

  .DayPicker-NavButton:hover {
    opacity: 0.8;
  }

  .DayPicker-NavButton--prev {
    left: 0.5rem;
    top: 0.6rem;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAVVJREFUWAnN2G0KgjAYwPHpGfRkaZeqvgQaK+hY3SUHrk1YzNLay/OiEFp92I+/Mp2F2Mh2lLISWnflFjzH263RQjzMZ19wgs73ez0o1WmtW+dgA01VxrE3p6l2GLsnBy1VYQOtVSEH/atCCgqpQgKKqYIOiq2CBkqtggLKqQIKgqgCBjpJ2Y5CdJ+zrT9A7HHSTA1dxUdHgzCqJIEwq0SDsKsEg6iqBIEoq/wEcVRZBXFV+QJxV5mBtlDFB5VjYTaGZ2sf4R9PM7U9ZU+lLuaetPP/5Die3ToO1+u+MKtHs06qODB2zBnI/jBd4MPQm1VkY79Tb18gB+C62FdBFsZR6yeIo1YQiLJWMIiqVjQIu1YSCLNWFgijVjYIuhYYCKoWKAiiFgoopxYaKLUWOii2FgkophYp6F3r42W5A9s9OcgNvva8xQaysKXlFytoqdYmQH6tF3toSUo0INq9AAAAAElFTkSuQmCC');
  }

  .DayPicker-NavButton--next {
    right: 0.5rem;
    top: 0.6rem;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAXRJREFUWAnN119ugjAcwPHWzJ1gnmxzB/BBE0n24m4xfNkTaOL7wOtsl3AXMMb+Vjaa1BG00N8fSEibPpAP3xAKKs2yjzTPH9RAjhEo9WzPr/Vm8zgE0+gXATAxxuxtqeJ9t5tIwv5AtQAApsfT6TPdbp+kUBcgVwvO51KqVhMkXKsVJFXrOkigVhCIs1Y4iKlWZxB1rX4gwlpRIIpa8SDkWmggrFq4IIRaJKCYWnSgnrXIQV1r8YD+1Vrn+bReagysIFfLABRt31v8oBu1xEBttfRbltmfjgEcWh9snUS2kNdBK6WN1vrOWxObWsz+fjxevsxmB1GQDfINWiev83nhaoiB/CoOU438oPrhXS0WpQ9xc1ZQWxWHqUYe0I0qrKCQKjygDlXIQV2r0IF6ViEBxVTBBSFUQQNhVYkHIVeJAtkNsbQ7c1LtzP6FsObhb2rCKv7NBIGoq4SDmKoEgTirXAcJVGkFSVVpgoSrXICGUMUH/QBZNSUy5XWUhwAAAABJRU5ErkJggg==');
  }

  .DayPicker-NavButton--interactionDisabled {
    display: none;
  }

  .DayPicker-Caption {
    padding: ${theme.spacing.sm};
    display: table-caption;
    border-bottom: 2px solid black;
    text-align: center;

    > div {
      font-family: ${theme.weight.b}, Helvetica;
    }
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
    padding-top: ${theme.spacing.sm};
    font-size: 0.875em;
    text-align: center;
    background: #eee;
  }

  .DayPicker-Weekday abbr[title] {
    border-bottom: none;
    text-decoration: none;
  }

  .DayPicker-Weekday:nth-of-type(4),
  .DayPicker-Weekday:nth-of-type(5) {
    background: ${theme.colour.white};
    font-family: ${theme.weight.b}, Helvetica;
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

    &[aria-disabled='false'] {
      font-weight: 700;
      font-family: ${theme.weight.b}, Helvetica;
      background: white;
      outline: 0px white solid;

      &:focus {
        outline: 3px solid ${theme.colour.focus};
        outline-offset: -2px;
      }
      &:hover {
        background-color: ${theme.colour.greyLight};
      }
    }

    &[aria-disabled='true'] {
      cursor: not-allowed;
      background: #eee;

      &:focus {
        outline: 3px solid ${theme.colour.lightGrey};
        outline-offset: -2px;
      }
    }
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
    cursor: default;
  }

  .DayPicker-Day--selected:not([aria-disabled='true']):not(.DayPicker-Day--outside) {
    background-color: ${theme.colour.blue};
    color: ${theme.colour.white};

    &:hover {
      background-color: ${incrementColor(theme.colour.blue, 30)};
    }
  }
`

const dayPicker = css`
  .DayPicker-Month {
  }
`

const noDates = css`
  display: none;
`

const calendarContainer = css`
  display: inline-flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;

  > div:first-of-type {
    width: 25em;
  }
  > div:last-of-type {
    width: 20em;
  }

  width: 100%;

  ${mediaQuery.lg(css`
    > div:first-of-type {
      width: 60%;
    }
    > div:last-of-type {
      width: 60%;
    }
  `)};

  ${mediaQuery.md(css`
    width: 100%;
    display: block;
    > div:first-of-type,
    > div:last-of-type {
      width: 100%;
    }
  `)};

  #selectedDays-list {
    margin: 0;

    li:last-of-type {
      margin-bottom: 0;
    }
  }
`

const dayBox = css`
  margin-bottom: ${theme.spacing.xs};
  display: flex;
  justify-content: space-between;
  align-items: center;

  .day-box {
    font-size: ${theme.font.md};
    color: ${theme.colour.white};

    ${mediaQuery.lg(css`
      width: 100%;
      color: ${theme.colour.black};
      font-size: ${theme.font.md};
    `)};

    &.empty {
      * {
        display: none;
      }
    }
  }

  button {
    font-size: ${theme.font.md};
    text-decoration: underline;
    color: ${theme.colour.link};
    margin-left: ${theme.spacing.lg};
    background-color: transparent;
    border: 0;
    cursor: pointer;

    &:focus {
      outline-offset: 2px;
      outline: 3px solid ${theme.colour.focus};
    }
  }
`

const daySelection = css`
  background: ${theme.colour.blackLight};
  margin-bottom: ${theme.spacing.xl};
  width: 20rem;
  padding: ${theme.spacing.lg} ${theme.spacing.lg} 0 ${theme.spacing.lg};

  li {
    border-top: 1px solid ${theme.colour.grayLight};
    padding-bottom: ${theme.spacing.md};
    padding-top: 1rem;
    margin-bottom: 0;
  }

  li:first-of-type {
    ${mediaQuery.lg(css`
      padding-top: ${theme.spacing.xs};
    `)};
  }

  li:last-of-type {
    padding-bottom: ${theme.spacing.lg};

    ${mediaQuery.lg(css`
      padding-bottom: ${theme.spacing.md};
    `)};
  }

  h3 {
    color: ${theme.colour.white};
    font-family: ${theme.weight.b}, Helvetica;
    font-size: ${theme.font.md};
    margin-bottom: ${theme.spacing.sm};
  }

  ${mediaQuery.lg(css`
    background: ${theme.colour.white};
    margin-bottom: 0;
    padding: 0 0 ${theme.spacing.sm} 0;
    width: 60%;

    li {
      color: ${theme.colour.black};
      border-top: 0;
      padding-top: 0;
      margin-bottom: ${theme.spacing.xs};
    }

    h3 {
      color: ${theme.colour.black};
      font-size: ${theme.font.lg};
    }
  `)};

  ${mediaQuery.md(css`
    width: 100%;
  `)};
`

const removeDateMobile = css`
  display: none;

  ${mediaQuery.lg(css`
    display: block;
    width: 1.6rem;
    height: 1.6rem;
  `)};
`

const removeDateDesktop = css`
  height: 1rem;
  width: 1rem;

  ${mediaQuery.lg(css`
    display: none;
  `)};
`

const selectedDaysError = css`
  margin-bottom: ${theme.spacing.md};
  padding: 0.2rem ${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.sm};
  background: ${theme.colour.white};

  &:focus {
    outline-offset: 3px;
    outline: 3px solid ${theme.colour.focus};
  }
`

const triangle = css`
  width: 0;
  height: 0;
  margin-top: ${theme.spacing.lg};
  margin-left: ${theme.spacing.md};
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-right: 25px solid ${theme.colour.blackLight};

  ${mediaQuery.lg(css`
    display: none;
  `)};
`

const sortSelectedDays = selectedDays => {
  // create a new array because .sort() modifies our original array
  let temp = selectedDays.slice()
  temp.sort((date1, date2) => date1.getTime() - date2.getTime())
  return temp
}

const renderDayBoxes = ({
  dayLimit,
  selectedDays,
  removeDayOnClickOrKeyPress,
  locale,
  removeDayAltText,
}) => {
  let dayBoxes = []
  let selectedDaysSorted = sortSelectedDays(selectedDays)
  for (let i = 0; i < dayLimit; i++) {
    let selectedDay = selectedDaysSorted[i] // eslint-disable-line security/detect-object-injection
    dayBoxes.push(
      selectedDay ? (
        <li key={i} className={dayBox}>
          <span className="day-box">
            <Time date={selectedDay} locale={locale} />
          </span>
          <button
            type="button"
            onClick={removeDayOnClickOrKeyPress(selectedDay)}
            onKeyPress={removeDayOnClickOrKeyPress(selectedDay)}
            aria-label={`${removeDayAltText}: ${dateToHTMLString(
              selectedDay,
              locale,
            )}`}
          >
            <div className={removeDateDesktop}>
              <img src={Cancel} alt={removeDayAltText} />
            </div>

            <div className={removeDateMobile}>
              <img src={MobileCancel} alt={removeDayAltText} />
            </div>
          </button>
        </li>
      ) : (
        ''
      ),
    )
  }
  return dayBoxes
}

// format aria-label for Day cell
const formatDay = (day, locale) => {
  return dateToHTMLString(day, locale)
}

const renderMonthName = ({ date, locale }) => {
  return (
    <div className="DayPicker-Caption" role="heading" aria-level="3">
      <div>{getMonthNameAndYear(date, locale)}</div>
    </div>
  )
}

renderMonthName.propTypes = {
  date: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
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
              You can&rsquo;t select more than 3 days. To change your
              selections, remove some days first.
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
      id,
      tabIndex,
      i18n,
    } = this.props
    const dateInfo = getDateInfo(i18n)
    const locale = i18n !== undefined ? i18n._language : 'en'
    const startMonth = parse(getStartMonth())
    const endDate = parse(toMonth())
    value = value || []
    return (
      <div className={calendarContainer}>
        <DayPicker
          className={css`
            ${dayPickerDefault} ${dayPicker};
          `}
          localeUtils={{ ...LocaleUtils, formatDay }}
          captionElement={renderMonthName}
          locale={locale}
          months={dateInfo.months}
          weekdaysLong={dateInfo.weekdaysLong}
          weekdaysShort={dateInfo.weekdaysShort}
          initialMonth={startMonth}
          fromMonth={startMonth}
          toMonth={endDate}
          numberOfMonths={1}
          disabledDays={[
            {
              before: parse(getStartDate(new Date())),
              after: endDate,
            },
            {
              daysOfWeek: [0, 1, 2, 5, 6],
            },
          ]}
          onDayClick={this.handleDayClick}
          selectedDays={value}
          onFocus={() => onFocus(value)}
          onBlur={() => onBlur(value)}
          containerProps={{ id, tabIndex }}
        />
        <div className={value.length ? triangle : noDates} />
        <div className={value.length ? daySelection : noDates}>
          <h3>
            <Trans>Your 3 selected days:</Trans>
          </h3>
          <div
            className={this.state.errorMessage ? selectedDaysError : ''}
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

          <ul id="selectedDays-list">
            {renderDayBoxes({
              dayLimit,
              selectedDays: value,
              removeDayOnClickOrKeyPress: this.removeDayOnClickOrKeyPress,
              locale,
              removeDayAltText:
                i18n !== undefined ? i18n._('Remove day') : 'Remove day',
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
const CalendarAdapter = withI18n()(Calendar)
export { CalendarAdapter as default, renderDayBoxes }
