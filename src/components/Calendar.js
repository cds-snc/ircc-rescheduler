import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import FieldAdapterPropTypes from './_Field'
import DayPicker, { DateUtils, LocaleUtils } from 'react-day-picker'
import { css, keyframes } from 'emotion'
import Time, { makeGMTDate, dateToHTMLString } from './Time'
import ErrorMessage from './ErrorMessage'
import { theme, mediaQuery, incrementColor, focusRing } from '../styles'
import MobileCancel from './MobileCancel'
import { getDateInfo } from '../utils/linguiUtils'
import withContext from '../withContext'
import {
  getStartMonth,
  getEndDate,
  getMonthNameAndYear,
  getStartDate,
  getInitialMonth,
  sortSelectedDays,
  getDisabledDays,
  getDaysOfWeekForLocation,
  getMonthName,
  notInDateRange,
  isFirstAvailableDay,
  isLastAvailableDay,
} from '../utils/calendarDates'
import parse from 'date-fns/parse'

import { logEvent } from '../utils/analytics'
import { windowExists } from '../utils/windowExists'
// import { CheckboxAdapter } from '../components/forms/MultipleChoice'
// import { Field } from 'react-final-form'
import TimeSlots from './TimeSlots'
import moment from 'moment'
import axios from 'axios'
import { logError } from '../utils/logger'

const jiggle = keyframes`
10%, 60% {
  transform: translate3d(-1px, 0, 0);
}

20%{
  transform: translate3d(2px, 0, 0);
}

30%, 40% , 50% {
  transform: translate3d(-2px, 0, 0);
}

40%, 60% {
  transform: translate3d(2px, 0, 0);
}
`

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
    background-image: url('data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiBmaWxsPSIjMDA4MjNiIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5LjQyIDE1LjYyIj48dGl0bGU+bGVmdEFycm93PC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEtMiI+PHBhdGggZD0iTTIuNzksNy44MWw1LjYzLDcuMzFINi4yNUwuNjMsNy44MSw2LjI1LjVIOC4zN1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiLz48cGF0aCBkPSJNNiwwSDkuNDJsLTYsNy44MSw2LDcuODFINkwwLDcuODFaTTcuMzYsMUg2LjQ5TDEuMjYsNy44MWw1LjIzLDYuODFoLjkzTDIuMTYsNy44MVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiLz48L2c+PC9nPjwvc3ZnPg==');
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
      font-size: 1.15rem;
      font-weight: 700;
    }
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
    background: white;
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
      background: ${theme.colour.greenLighter};
      outline: 0px white solid;

      &:focus {
        outline: 3px solid ${theme.colour.black};
        outline-offset: -2px;
      }
      &:hover {
        background-color: ${theme.colour.greenLight};
      }
    }

    &[aria-disabled='true'] {
      cursor: not-allowed;
      cursor: url('disableddates.ico') 20 20, not-allowed;
      background: white;

      &:focus {
        outline-style: dashed;
        outline-color: ${theme.colour.grey};
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
    background-color: ${theme.colour.greenDark};
    color: ${theme.colour.white};

    &:hover {
      background-color: ${incrementColor(theme.colour.greenDark, 30)};
    }
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
    width: 23em;
  }

  width: 100%;

  ${mediaQuery.lg(css`
    > div:last-of-type {
      width: 25em;
    }
  `)};

  ${mediaQuery.md(css`
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
    color: ${theme.colour.black};
    height: 1.3rem;

    ${mediaQuery.lg(css`
      color: ${theme.colour.black};
      font-size: ${theme.font.md};
    `)};
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
  background: ${theme.colour.greyLight};
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.lg} ${theme.spacing.lg} 0 ${theme.spacing.lg};
  width: 95%;
  height: auto;
  box-shadow: 5px 10px #888888;
  float: right;

  button {
    padding: 0;
  }

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
  border-right: 25px solid ${theme.colour.greyLight};

  ${mediaQuery.lg(css`
    display: none;
  `)};
`

const calendarContainerTop = css`
  ${calendarContainer};
  ${mediaQuery.lg(css`
    flex-direction: column-reverse;
  `)};
`

const datesLinkBefore = css`
  margin-top: 5.7rem;
  ${mediaQuery.lg(css`
    margin-top: 0;
  `)};

  margin-left: 2.4rem;
  display: block;

  ${mediaQuery.lg(css`
    margin-left: 0;
    margin: 0;
  `)};

  margin-bottom: ${theme.spacing.xxl};
`

// eslint-disable-next-line no-unused-vars
const datesLinkAfter = css`
  ${datesLinkBefore};
  margin-top: 1.5rem;
`

const removeDateMessage = css`
  margin-bottom: calc(${theme.spacing.lg} + ${theme.spacing.md});

  display: inline-block;
  h2 {
    margin-top: 0 !important;
  }
  ${focusRing};
  outline-offset: ${theme.spacing.md};
`

const renderDayBoxes = ({
  dayLimit,
  selectedDays,
  selectedTime,
  removeDayOnClickOrKeyPress,
  locale,
  errorMessage,
  removeDayAltText,
}) => {
  let dayBoxes = []
  let selectedDaysSorted = sortSelectedDays(selectedDays)
  for (let i = 0; i < dayLimit; i++) {
    let selectedDay = selectedDaysSorted[i] // eslint-disable-line security/detect-object-injection

    let dateLabel = selectedDay
      ? `${removeDayAltText}: ${dateToHTMLString(selectedDay, locale)}`
      : ''

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
            aria-label={dateLabel}
          >
            <div className={removeDate}>
              <MobileCancel
                index={i}
                circleColour={
                  errorMessage ? theme.colour.red : theme.colour.blackLight
                }
                label={dateLabel}
              />
            </div>
          </button>
        </li>
      ) : (
        <li key={i} className={dayBox}>
          <span className="empty day-box">
            <Trans>Please select another date</Trans>
          </span>
        </li>
      ),
    )
  }
  return dayBoxes
}

// format aria-label for Day cell
const formatDay = (day, locale) => {
  const date = dateToHTMLString(day, locale)

  // unavailable check
  if (!notInDateRange(day)) {
    let prepend = 'unavailable'

    if (locale === 'fr') {
      prepend = 'indisponible'
    }

    return `${prepend} ${date}`
  }

  // first day check
  if (isFirstAvailableDay(day)) {
    let prepend = 'first available day'

    if (locale === 'fr') {
      prepend = 'premier jour disponible'
    }
    return `${prepend} ${date}`
  }

  // last day check
  if (isLastAvailableDay(day)) {
    let prepend = 'last available day'

    if (locale === 'fr') {
      prepend = 'dernier jour disponible'
    }
    return `${prepend} ${date}`
  }

  return date
}

const renderMonthName = ({ date, locale }) => {
  return (
    <div
      className="DayPicker-Caption"
      role="heading"
      aria-level="3"
      id="renderMonthName"
    >
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
    this.getNewTimeslots = this.getNewTimeslots.bind(this)
    this.getSafe = this.getSafe.bind(this)
    this.state = {
      errorMessage: null,
      daysOfWeek: false,
      daysModified: false,
      timeSelected: '',
    }
    this.oneDatesArePicked =
      this.props.input.value &&
      Array.isArray(this.props.input.value) &&
      this.props.input.value.length === 1
  }

  componentDidMount() {
    if (this.oneDatesArePicked && this.props.input.value.length === 1) {
      this.removeDateContainer.focus()
    }

    this.getNewTimeslots(this.props.month)
  }

  getSafe(fn, defaultVal) {
    try {
      return fn()
    } catch (e) {
      return defaultVal
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

  getNewTimeslots(selectedDay) {
    let userSelection = this.getSafe(
      () => this.props.context.store.register.accessibility,
      false,
    )
    let accessible = true
    if (!userSelection || userSelection[0] === undefined) {
      accessible = false
    }
    let locationId = this.getSafe(
      () => this.props.context.store.selectProvince.locationId,
      '40',
    )
    let formattedDay = moment(selectedDay).format('YYYY-MM-DD')
    let values = {
      ...this.props.context.store.calendar,
    }
    axios
      .get(
        `/appointments/timeslots/${locationId}?day=${formattedDay}&accessible=${accessible}`,
      )
      .then(async resp => {
        let timeSlots = resp.data
        values = {
          ...values,
          timeSlots,
        }
        await this.setState({ timeSlots: timeSlots })
        await this.props.context.setStore('calendar', values)
      })
      .catch(err => {
        logError(err)
      })
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

    if (selected) {
      this.setState({ daysModified: true })
    }

    // !selected means that this current day is not marked as 'selected' on the calendar
    if (!selected) {
      // If we have already selected the maximum number of days,
      // add an error message to the internal state and then return early
      if (selectedDays.length >= dayLimit) {
        await this.setState({
          errorMessage: (
            <Trans>
              You can&rsquo;t select more than 1 day. To change your selections,
              remove a day first.
            </Trans>
          ),
        })

        this.errorContainer.focus()
        if (windowExists()) {
          window.scrollTo(0, this.errorContainer.offsetTop - 20)
        }

        logEvent('Calendar', 'Select', 'Error: More than 3 days')

        return
      }

      // push new day into array of selectedDays
      selectedDays.push(day)
      this.getNewTimeslots(selectedDays[0])
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

    // force a render to keep calendar errors in sync
    this.props.forceRender(selectedDays)
  }

  selectedTime = id => {
    this.props.timeslotSelected(id)
    this.setState({
      timeSelected: id,
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
    const endDate = parse(getEndDate())
    value = value || []

    const initialMonth = getInitialMonth(value, startMonth)

    /*
    We need the highlighted day of the week to be dynamic
    as the month changes
    */

    let [dayOfWeek1 = undefined, dayOfWeek2 = undefined] = this.state.daysOfWeek
      ? this.state.daysOfWeek
      : getDaysOfWeekForLocation(undefined, initialMonth)

    let arrowAnimate = ``

    if (
      getMonthName(initialMonth) === getMonthName(this.props.month) &&
      !this.props.calDisabled
    ) {
      arrowAnimate = `animation: ${jiggle} 5s ease-in-out infinite;`
    }

    const weekdayStyles = css`
      ${dayPickerDefault};

      .DayPicker-Weekday:nth-of-type(${dayOfWeek1}),
      .DayPicker-Weekday:nth-of-type(${dayOfWeek2}) {
        // background: ${theme.colour.greenLighter};
        // font-weight: 700;
      }

      .DayPicker-Day--outside:nth-of-type(${dayOfWeek1}),
      .DayPicker-Day--outside:nth-of-type(${dayOfWeek2}) {
        background: ${theme.colour.white};
      }

      .DayPicker-Day--disabled:nth-of-type(${dayOfWeek1}),
      .DayPicker-Day--disabled:nth-of-type(${dayOfWeek2}) {
        background: white;
      }

      .DayPicker-NavButton--next {
        right: 0.5rem;
        top: 0.5rem;
        background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9ImNhbC1hcnJvdy1yaWdodCIgZmlsbD0iIzAwODIzYiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDkuNCAxNS42IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA5LjQgMTUuNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8ZyBpZD0iTGF5ZXJfMiI+Cgk8ZyBpZD0iTGF5ZXJfMS0yIj4KCQk8cGF0aCBkPSJNNi42LDcuOEwxLDAuNWgyLjJsNS42LDcuM2wtNS42LDcuM0gxTDYuNiw3Ljh6Ii8+CgkJPHBhdGggZD0iTTMuNCwxNS42SDBsNi03LjhMMCwwaDMuNGw2LDcuOEwzLjQsMTUuNnogTTIuMSwxNC42aDAuOWw1LjItNi44TDIuOSwxSDJsNS4zLDYuOEwyLjEsMTQuNnoiLz4KCTwvZz4KPC9nPgo8L3N2Zz4K');
        ${arrowAnimate};
      }
    `

    return (
      <div>
        <div
          tabIndex="-1"
          className={focusRing}
          ref={errorContainer => {
            this.errorContainer = errorContainer
          }}
        >
          <ErrorMessage
            message={this.state.errorMessage}
            id="selectedDays-error"
          />
        </div>

        {this.oneDatesArePicked &&
        this.state.daysModified === false &&
        !this.state.errorMessage ? (
          <div
            tabIndex="-1"
            className={removeDateMessage}
            id="removeDateMessage"
          >
            <h2>
              <Trans>To change your selections, remove a day first</Trans>.
            </h2>
          </div>
        ) : null}
        <div
          className={
            this.oneDatesArePicked ? calendarContainerTop : calendarContainer
          }
        >
          <DayPicker
            className={css`
              ${weekdayStyles};
            `}
            localeUtils={{ ...LocaleUtils, formatDay }}
            captionElement={renderMonthName}
            locale={locale}
            months={dateInfo.months}
            weekdaysLong={dateInfo.weekdaysLong}
            weekdaysShort={dateInfo.weekdaysShort}
            initialMonth={initialMonth}
            fromMonth={startMonth}
            toMonth={endDate}
            numberOfMonths={1}
            onMonthChange={month => {
              this.setState({
                daysOfWeek: getDaysOfWeekForLocation(undefined, month),
              })

              this.props.changeMonth(month)
            }}
            disabledDays={[
              {
                before: parse(getStartDate(new Date())),
                after: endDate,
              },

              ...getDisabledDays(),
            ]}
            onDayClick={this.handleDayClick}
            selectedDays={value}
            onFocus={() => onFocus(value)}
            onBlur={() => onBlur(value)}
            containerProps={{
              id,
              tabIndex,
              'aria-labelledby': 'renderMonthName',
              'aria-describedby': 'firstDayString',
            }}
          />
          <div>
            <div id="selectedDaysBox" style={{ display: 'flex' }}>
              <div className={value.length ? triangle : noDates} />
              <div className={value.length ? daySelection : noDates}>
                <label
                  tabIndex="-1"
                  style={{ outline: 0 }}
                  htmlFor="TimeSlot"
                  ref={removeDateContainer => {
                    this.removeDateContainer = removeDateContainer
                  }}
                >
                  {value.length === 1 ? (
                    <Trans>Please select your time slot</Trans>
                  ) : (
                    <Trans>Select a day:</Trans>
                  )}
                </label>

                <ul id="selectedDays-list">
                  {renderDayBoxes({
                    dayLimit,
                    errorMessage: this.state.errorMessage,
                    selectedDays: value,
                    selectedTime: this.state.timeSelected,
                    removeDayOnClickOrKeyPress: this.removeDayOnClickOrKeyPress,
                    locale,
                    removeDayAltText:
                      i18n !== undefined ? i18n._('Remove day') : 'Remove day',
                  })}
                </ul>
                <div>
                  <TimeSlots
                    selectedTimeId={this.selectedTime}
                    selectedDay={value}
                    timeSlots={this.state.timeSlots}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Calendar.defaultProps = {
  forceRender: () => {}, //used to for a parent re-render after clicking on a day
  updateTime: () => {},
  changeMonth: () => {},
  showAvailability: false,
}

Calendar.propTypes = {
  ...FieldAdapterPropTypes,
  dayLimit: PropTypes.number.isRequired,
  forceRender: PropTypes.func,
  updateTime: PropTypes.func,
  showAvailability: PropTypes.bool,
}

const CalendarAdapter = withContext(withI18n()(Calendar))
export { CalendarAdapter as default, renderDayBoxes }
