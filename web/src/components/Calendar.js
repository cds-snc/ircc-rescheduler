import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from 'lingui-react'
import FieldAdapterPropTypes from './_Field'
import DayPicker, { DateUtils, LocaleUtils } from 'react-day-picker'
import { css } from 'emotion'
import Time, { makeGMTDate, dateToHTMLString } from './Time'
import { ErrorCalendar } from './ErrorMessage'
import { theme, mediaQuery, incrementColor, focusRing } from '../styles'
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

    ${mediaQuery.sm(css`
      font-size: ${theme.font.md};
    `)};

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
    width: 24.75rem;

    ${mediaQuery.md(css`
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
    top: 0.5rem;
    background-image: url('data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5LjQyIDE1LjYyIj48dGl0bGU+bGVmdEFycm93PC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEtMiI+PHBhdGggZD0iTTIuNzksNy44MWw1LjYzLDcuMzFINi4yNUwuNjMsNy44MSw2LjI1LjVIOC4zN1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiLz48cGF0aCBkPSJNNiwwSDkuNDJsLTYsNy44MSw2LDcuODFINkwwLDcuODFaTTcuMzYsMUg2LjQ5TDEuMjYsNy44MWw1LjIzLDYuODFoLjkzTDIuMTYsNy44MVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiLz48L2c+PC9nPjwvc3ZnPg==');
  }

  .DayPicker-NavButton--next {
    right: 0.5rem;
    top: 0.5rem;
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA5LjQgMTUuNiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOS40IDE1LjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGcgaWQ9IkxheWVyXzIiPgoJPGcgaWQ9IkxheWVyXzEtMiI+CgkJPHBhdGggZD0iTTYuNiw3LjhMMSwwLjVoMi4ybDUuNiw3LjNsLTUuNiw3LjNIMUw2LjYsNy44eiIvPgoJCTxwYXRoIGQ9Ik0zLjQsMTUuNkgwbDYtNy44TDAsMGgzLjRsNiw3LjhMMy40LDE1LjZ6IE0yLjEsMTQuNmgwLjlsNS4yLTYuOEwyLjksMUgybDUuMyw2LjhMMi4xLDE0LjZ6Ii8+Cgk8L2c+CjwvZz4KPC9zdmc+Cg==');
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
    padding: ${theme.spacing.sm} 0 ${theme.spacing.sm} 0;
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
    height: 3.4rem;
    width: 3.4rem;

    ${mediaQuery.md(css`
      height: 4.5rem;
      width: 4.5rem;
    `)};

    ${mediaQuery.sm(css`
      height: 2.8rem;
      width: 2.8rem;
    `)};

    ${mediaQuery.xs(css`
      height: 1rem;
      width: 1rem;
    `)};

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
    > div:last-of-type {
      width: 25em;
    }
  `)};

  ${mediaQuery.md(css`
    > div:first-of-type {
      width: 100%;
    }
    > div:last-of-type {
      width: 100%;
    }
  `)};

  ${mediaQuery.sm(css`
    > div:first-of-type {
      width: 100%;
    }
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
    color: ${theme.colour.black};

    ${mediaQuery.lg(css`
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
  background: #e1e1e1;
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.lg} ${theme.spacing.lg} 0 ${theme.spacing.lg};
  width: 20rem;

  li {
    border-top: 1px solid ${theme.colour.black};
    padding-bottom: ${theme.spacing.md};
    padding-top: 1rem;
    margin-bottom: 0;
  }

  li:last-of-type {
    padding-bottom: ${theme.spacing.lg};
  }

  h3 {
    color: ${theme.colour.black};
    font-family: ${theme.weight.b}, Helvetica;
    font-size: ${theme.font.md};
    margin-bottom: ${theme.spacing.sm};
  }

  ${mediaQuery.lg(css`
    background: ${theme.colour.white};
    margin-bottom: 0;
    padding: 0 0 ${theme.spacing.sm} 0;

    li {
      color: ${theme.colour.black};
      border-top: 0;
      padding-top: 0;
      margin-bottom: ${theme.spacing.xs};
    }

    li:last-of-type {
      padding-bottom: ${theme.spacing.lg};
      padding-bottom: ${theme.spacing.md};
    }

    li:first-of-type {
      padding-top: ${theme.spacing.xs};
    }

    h3 {
      color: ${theme.colour.black};
      font-size: ${theme.font.lg};
    }
  `)};
`

const removeDate = css`
  width: 1rem;
  height: 1rem;

  ${mediaQuery.lg(css`
    display: block;
    width: 1.6rem;
    height: 1.6rem;
  `)};
`

const triangle = css`
  width: 0;
  height: 0;
  margin-top: ${theme.spacing.lg};
  margin-left: ${theme.spacing.md};
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-right: 25px solid #e1e1e1;

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
            <div className={removeDate}>
              <img
                src={MobileCancel}
                alt={locale === 'en' ? 'Remove day' : 'Supprimer cette journée'}
              />
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
      <div>
        <div
          tabIndex="-1"
          ref={errorContainer => {
            this.errorContainer = errorContainer
          }}
        >
          <ErrorCalendar
            message={this.state.errorMessage}
            id="selectedDays-error"
          />
        </div>
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
