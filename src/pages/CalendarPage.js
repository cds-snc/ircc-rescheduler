import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { Trans } from '@lingui/react'
import { css } from 'emotion'
import { focusRing, arrow } from '../styles'
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
import ErrorMessage from '../components/ErrorMessage'
import { windowExists } from '../utils/windowExists'
import { logEvent } from '../utils/analytics'
import {
  getDaysOfWeekForLocation,
  dayFromDayNumber,
  getMonthName,
  initialMonth,
} from '../utils/calendarDates'

import { CalHeader } from './calendar/CalHeader'
import { CalBottom } from './calendar/CalBottom'
import CalendarPageNoJS from './CalendarPageNoJS'
import rightArrow from '../assets/rightArrow.svg'

const DAY_LIMIT = 1

const fullWidth = css`
  width: 100% !important;
`
const landingArrow = css`
  ${arrow};
  margin-left: 4px;
`

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
    this.hasNotValid = this.hasNotValid.bind(this)
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

  updateTime(id) {
    this.setState({ timeValue: id })
  }
  forceRender(values) {
    // call setState to force a render
    this.setState({ calValues: values })
    // eslint-disable-next-line no-console
    console.log(values)
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

  async onSubmit(values, event) {
    let issue = {
      selectedTime: selectedTime,
    }
    values.push(issue)
    // eslint-disable-next-line no-console
    console.log(values)
    const submitErrors = this.validate(values)
    // eslint-disable-next-line no-console
    console.log(submitErrors)

    // eslint-disable-next-line no-console
    console.log(values)

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

      const err = errorMessages[submitErrors.selectedDays]
        ? errorMessages[submitErrors.selectedDays]
        : submitErrors.selectedDays
      return {
        [FORM_ERROR]: err,
      }
    }

    // values.selectedDays (when set) is an array of dates, so cast values to ISO date strings
    let selectedDays = (values.selectedDays || []).map(date =>
      dateToISODateString(date),
    )

    let ipID = {
      selectedTime: selectedTime,
    }

    let selectedTime = this.state.timeValue

    values = {
      ...values,
      selectedDays,
      selectedTime,
    }

    // eslint-disable-next-line no-console
    console.log(this.props)
    await this.props.context.setStore(this.props.match.path.slice(1), values)

    if (values.availability && values.availability.length) {
      await this.props.history.push('/explanation')
    } else {
      await this.props.history.push('/review')
    }
  }

  render() {
    let {
      context: {
        store: {
          calendar = {},
          language: locale = 'en',
          register: { familyOption } = {},
        } = {},
      } = {},
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
          familyOption={familyOption}
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
            let err

            const notValid = this.hasNotValid()
            const { availability } = values

            // eslint-disable-next-line no-console
            console.log(values.selectedDays)
            // eslint-disable-next-line no-console
            console.log(this.state.timeValue)

            if (submitError && this.validate(values).selectedDays) {
              let valuesLength =
                values && values.selectedDays && values.selectedDays.length
                  ? values.selectedDays.length
                  : 0

              switch (valuesLength) {
                case 1:
                  err = (
                    <React.Fragment>
                      {submitError}{' '}
                      <Trans>Please select 2 more days to continue.</Trans>
                    </React.Fragment>
                  )
                  break
                case 2:
                  err = (
                    <React.Fragment>
                      {submitError}{' '}
                      <Trans>Please select 1 more day to continue.</Trans>
                    </React.Fragment>
                  )
                  break
                default:
                  err = submitError
              }
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
                    <ErrorMessage
                      message={err ? err : null}
                      id="fewerDays-error"
                    />
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
                <CalBottom
                  availability={
                    availability && availability.length ? true : false
                  }
                  submit={() => {
                    return (
                      <Button disabled={submitting}>
                        <Trans>Next</Trans>
                        <img src={rightArrow} className={landingArrow} alt="" />
                      </Button>
                    )
                  }}
                />
              </form>
            )
          }}
        />
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
