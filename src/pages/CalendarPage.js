import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { Trans } from '@lingui/react'
import { css } from 'emotion'
import { GoBackButtonCal } from '../components/forms/GoBackButton'

import { HashLink } from 'react-router-hash-link'
import {
  mediaQuery,
  theme,
  contentClass,
  BottomContainer,
  focusRing,
} from '../styles'
import {
  CalendarFields,
  getFieldNames,
  defaultMessages,
  getFieldErrorStrings,
  errorMessages,
} from '../validation'

import Validator from 'validatorjs'
import { trimInput } from '../utils/cleanInput'
import Layout from '../components/Layout'
import { matchPropTypes } from '../components/Title'
import Button from '../components/forms/Button'
import CalendarAdapter from '../components/Calendar'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { makeGMTDate, dateToISODateString } from '../components/Time'
import { ErrorList } from '../components/ErrorMessage'
import { windowExists } from '../utils/windowExists'
import { logEvent } from '../utils/analytics'
import {
  getDaysOfWeekForLocation,
  dayFromDayNumber,
  getMonthName,
  initialMonth,
} from '../utils/calendarDates'

import { CalHeader } from './calendar/CalHeader'
import CalendarPageNoJS from './CalendarPageNoJS'
import { GoArrowRight } from 'react-icons/go'
import { ReportButton } from '../components/forms/ReportButton'

import axios from 'axios'
import moment from 'moment'
import DateModified from '../components/DateModified'

const DAY_LIMIT = 1

const calendarContentClass = css`
  ${contentClass};
  p {
    margin-bottom: ${theme.spacing.sm};

    ${mediaQuery.md(css`
      margin-bottom: ${theme.spacing.lg};
    `)};
  }
  fieldset {
    border: none;
  }
`

const fullWidth = css`
  width: 100% !important;
`
const goArrowRight = css`
  font-size: 24px;
  vertical-align: middle;
  left: 9px;
  height: 1.3rem;
  width: 1.3rem;
  bottom: 0.058em;
  position: relative;
`
const buttonSpacing = css`
  padding-left: 20px;
`
const spacingButton = css`
  position: relative;
  top: 35px;
`

const labelNames = id => {
  switch (id) {
    case 'selectedDays':
      return <Trans>Select a day</Trans>
    case 'selectedTime':
      return <Trans>Select a time</Trans>
    default:
      return ''
  }
}

class CalendarPage extends Component {
  static get fields() {
    return getFieldNames(CalendarFields)
  }

  static validate(values) {
    // create a cloned object from the original CalendarFields
    let calendarFields = Object.assign({}, CalendarFields)

    /* if the availability checkbox is set, remove the validation for selectedDays */
    calendarFields.selectedDays =
      values.availability && values.availability.length
        ? 'accept_anything'
        : CalendarFields.selectedDays

    if (!values.selectedDays) {
      values.selectedDays = []
    }

    const validate = new Validator(
      trimInput(values),
      calendarFields,
      defaultMessages,
    )

    if (validate.passes()) {
      return {}
    }

    return getFieldErrorStrings(validate)
  }

  static saveAfter(calendar = {}) {
    let kv = {
      key: 'explanation',
      val: { explanationPage: '' },
    }

    let { availability: [notAvailable] = [] } = calendar
    if (notAvailable === 'notAvailable') {
      kv = {}
    }

    return kv
  }

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = CalendarPage.validate
    this.forceRender = this.forceRender.bind(this)
    this.changeMonth = this.changeMonth.bind(this)
    this.submitTempAppointment = this.submitTempAppointment.bind(this)
    this.hasNotValid = this.hasNotValid.bind(this)
    this.getSafe = this.getSafe.bind(this)
    this.updateTime = this.updateTime.bind(this)
    this.form = null
    this.state = {
      month: initialMonth(this.props),
      headerMonth: '',
      headerNote: [],
      calValues: false,
      timeValue: '',
      disabled: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.context.store.language !== prevProps.context.store.language
    ) {
      this.changeMonth()
    }
  }

  componentDidMount() {
    this.changeMonth()
  }

  /*
  Check if the form was redirected from the server
  */

  hasNotValid() {
    return this.props.location.search.indexOf('not-valid') !== -1
  }

  getSafe(fn, defaultVal) {
    try {
      return fn()
    } catch (e) {
      return defaultVal
    }
  }

  updateTime(id) {
    if (id === '0') id = ''
    this.setState({ timeValue: id })
  }

  forceRender(values) {
    // call setState to force a render
    this.setState({ calValues: values })
  }

  changeMonth(month = this.state.month) {
    let {
      context: { store: { language: locale = 'en' } = {} } = {},
    } = this.props

    const days = getDaysOfWeekForLocation(undefined, month)
    const dayText = days.map((day, i) => {
      return (
        <React.Fragment key={day}>
          {i !== 0 && (
            <React.Fragment>
              {' '}
              <Trans>and</Trans>{' '}
            </React.Fragment>
          )}{' '}
          {dayFromDayNumber(day).plural}
        </React.Fragment>
      )
    })

    this.setState({
      month: month,
      headerMonth: getMonthName(month, locale),
      headerNote: dayText,
    })
  }

  submitTempAppointment() {
    let values = {
      ...this.props.context.store,
    }
    let userSelection = this.getSafe(
      () => this.props.context.store.register.accessibility,
      false,
    )
    let date = moment.utc(values.calendar.selectedDays[0])
    let time = moment.utc(values.calendar.selectedTime, 'hh:mm a')
    date.set({
      hour: time.get('hour'),
      minute: time.get('minute'),
    })
    let accessibility = true
    if (!userSelection || userSelection[0] === undefined) {
      accessibility = false
    }
    let appointment = {
      clientEmail: values.register.email,
      locationId: values.selectProvince.locationId,
      // TODO: Get bioKit information during selection of timeslot
      // bioKitId: String,
      bil: values.register.paperFileNumber,
      date: date,
      privateAccessible: accessibility,
    }
    return axios.post(`/appointments/temp`, appointment)
  }

  async onSubmit(values, event) {
    // values.selectedDays (when set) is an array of dates, so cast values to ISO date strings
    let selectedDays = (values.selectedDays || []).map(date =>
      dateToISODateString(date),
    )

    let selectedTime = this.state.timeValue

    values = {
      ...values,
      selectedDays,
      selectedTime,
    }

    const submitErrors = this.validate(values)

    if (Object.keys(submitErrors).length) {
      if (windowExists()) {
        window.scrollTo(0, this.errorContainer.offsetTop - 20)
      }

      this.errorContainer.focus()

      logEvent(
        'Calendar',
        'Submit',
        `Error: ${values.selectedDays.length} Day(s) selected`,
      )

      if (this.validate(values).selectedDays) {
        const err = errorMessages[submitErrors.selectedDays]
        return {
          [FORM_ERROR]: err,
        }
      }

      if (this.validate(values).selectedTime) {
        const err = errorMessages[submitErrors.selectedTime]
        return {
          [FORM_ERROR]: err,
        }
      }
    }

    await this.props.context.setStore(this.props.match.path.slice(1), values)

    if (values.availability && values.availability.length) {
      await this.props.history.push('/explanation')
    } else {
      await this.submitTempAppointment()
        .then(async resp => {
          let tempAppointment = resp.data
          values = {
            ...values,
            tempAppointment,
          }
          await this.props.context.setStore(
            this.props.match.path.slice(1),
            values,
          )
        })
        .catch(err => {
          this.props.history.push('/error')
        })
      await this.props.history.push('/review')
    }
  }

  render() {
    let {
      context: { store: { calendar = {}, language: locale = 'en' } = {} } = {},
    } = this.props

    // we aren't going to check for a no-js submission because currently nothing happens when someone presses "review request"

    // cast values to Date objects if calendar.selectedDays exists and has a length
    if (calendar && calendar.selectedDays && calendar.selectedDays.length) {
      calendar.selectedDays = calendar.selectedDays.map(day => makeGMTDate(day))
    }

    let calValues = calendar

    // use values from state if this is a forced render
    if (this.state.calValues) {
      calValues.selectedDays = this.state.calValues
    }

    const { month } = this.state

    return (
      <Layout>
        <CalHeader
          locale={locale}
          path={this.props.match.path}
          headerMonth={this.state.headerMonth}
          headerNote={this.state.headerNote}
        />
        <Form
          onSubmit={this.onSubmit}
          initialValues={calValues}
          render={({
            handleSubmit,
            reset,
            submitting,
            pristine,
            values,
            errors,
            submitError,
          }) => {
            const notValid = this.hasNotValid()
            const { availability } = values

            let selectedTime = this.state.timeValue

            values = {
              ...values,
              selectedTime,
            }

            return (
              <form
                id="calendar-form"
                onSubmit={handleSubmit}
                className={fullWidth}
                ref={el => {
                  if (!this.form && notValid) {
                    this.form = el
                    el.dispatchEvent(new Event('submit')) // eslint-disable-line no-undef
                  }
                }}
              >
                <div
                  className={
                    availability && availability.length ? 'disabled' : ''
                  }
                >
                  <div
                    id="submit-error"
                    tabIndex="-1"
                    className={focusRing}
                    ref={errorContainer => {
                      this.errorContainer = errorContainer
                    }}
                  >
                    <ErrorList message={submitError || ''}>
                      {Object.keys(this.validate(values)).map((formId, i) => (
                        <HashLink
                          to={
                            formId === 'reason'
                              ? '#reason-header'
                              : `#${formId}-label`
                          }
                          key={i}
                        >
                          {labelNames(formId) ? labelNames(formId) : formId}
                          <br />
                        </HashLink>
                      ))}
                    </ErrorList>
                  </div>
                  <Field
                    name="selectedDays"
                    id="selectedDays"
                    tabIndex={0}
                    component={CalendarAdapter}
                    dayLimit={DAY_LIMIT}
                    showAvailability={true}
                    timeslotSelected={this.updateTime}
                    forceRender={this.forceRender}
                    changeMonth={this.changeMonth}
                    month={month}
                    calDisabled={
                      availability && availability.length ? true : false
                    }
                  />
                </div>

                <div className={calendarContentClass}>
                  <div>
                    <GoBackButtonCal />
                    <span className={buttonSpacing}> </span>
                    <Button id="nextButton" disabled={submitting}>
                      <Trans>Next</Trans>
                      <GoArrowRight className={goArrowRight} />
                    </Button>
                  </div>
                </div>
              </form>
            )
          }}
        />
        <div className={spacingButton}>
          <BottomContainer>
            <ReportButton />
          </BottomContainer>
        </div>
        <div />
        <DateModified />
      </Layout>
    )
  }
}

CalendarPage.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
  history: PropTypes.any,
  submit: PropTypes.func,
  locale: PropTypes.string,
}

const WhichCalendarPage = () => {
  if (windowExists()) {
    return CalendarPage
  }

  return CalendarPageNoJS
}

export default withContext(WhichCalendarPage())
