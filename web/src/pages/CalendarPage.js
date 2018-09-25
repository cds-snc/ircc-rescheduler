import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { Trans } from '@lingui/react'
import { css } from 'react-emotion'
import { focusRing } from '../styles'
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
import { FeatureFlag } from '../components/FeatureFlag'

const DAY_LIMIT = 3

const fullWidth = css`
  width: 100% !important;
`
class CalendarPage extends Component {
  static get fields() {
    return getFieldNames(CalendarFields)
  }

  static validate(values) {
    /* if the availability checkbox is set just return */
    if (values.availability && values.availability.length) {
      return {}
    }

    if (values.selectedDays === undefined) {
      values.selectedDays = []
    }

    const validate = new Validator(
      trimInput(values),
      CalendarFields,
      defaultMessages,
    )

    if (validate.passes()) {
      return {}
    }

    return getFieldErrorStrings(validate)
  }

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = CalendarPage.validate
    this.forceRender = this.forceRender.bind(this)
    this.changeMonth = this.changeMonth.bind(this)
    this.hasNotValid = this.hasNotValid.bind(this)
    this.form = null
    this.state = {
      month: initialMonth(this.props),
      headerMonth: '',
      headerNote: [],
      calValues: false,
      disabled: false,
      forcedUpdate: false,
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

  forceRender(values) {
    // call setState to force a render
    this.setState({ calValues: values, forcedUpdate: true })
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

      const err = errorMessages[submitErrors.selectedDays]
        ? errorMessages[submitErrors.selectedDays]
        : submitErrors.selectedDays
      return {
        [FORM_ERROR]: err,
      }
    }

    let availability = values.availability
    let days = availability
      ? []
      : values.selectedDays.map(date => dateToISODateString(date))

    // values.selectedDays is an array of dates, so cast them to ISO date strings
    values = {
      selectedDays: days,
      availability,
    }

    await this.props.context.setStore(this.props.match.path.slice(1), values)

    if (values.availability && availability.length) {
      await this.props.history.push('/explanation')
    } else {
      // clear the availability explanationPage field as needed
      await this.props.context.setStore('explanation', { explanationPage: '' })
      await this.props.history.push('/review')
    }
  }

  render() {
    let {
      context: {
        store: {
          calendar = {},
          explanation = {},
          language: locale = 'en',
          register: { familyOption } = {},
        } = {},
      } = {},
    } = this.props

    // we aren't going to check for a no-js submission because currently nothing happens when someone presses "review request"

    // cast values to Date objects if calendar.selectedDays exists and has a length
    if (calendar && calendar.selectedDays && calendar.selectedDays.length) {
      calendar = {
        selectedDays: calendar.selectedDays.map(day => makeGMTDate(day)),
      }
    }

    let calValues = calendar

    // use values from state if this is a forced render
    if (this.state.calValues) {
      calValues.selectedDays = this.state.calValues
    }

    const { month, forcedUpdate } = this.state

    /* 
    we only want to check to happen on initial page load
    not after day clicks 
    */
    if (explanation.explanationPage !== '' && !forcedUpdate) {
      calValues.availability = ['notAvailable']
    }

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
                    tabIndex={-1}
                    component={CalendarAdapter}
                    dayLimit={DAY_LIMIT}
                    forceRender={this.forceRender}
                    changeMonth={this.changeMonth}
                    month={month}
                    calDisabled={
                      availability && availability.length ? true : false
                    }
                  />
                </div>
                <CalBottom
                  submit={() => {
                    return (
                      <FeatureFlag
                        flags={['nextButton']}
                        on={() => (
                          <Button disabled={submitting}>
                            <Trans>Next</Trans>
                          </Button>
                        )}
                        off={() => (
                          <Button disabled={submitting}>
                            <Trans>Review request</Trans>
                          </Button>
                        )}
                      />
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
