import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { Trans } from 'lingui-react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'react-emotion'
import {
  theme,
  BottomContainer,
  TopContainer,
  H1,
  H2,
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
import Title, { matchPropTypes } from '../components/Title'
import Button from '../components/forms/Button'
import CalendarAdapter from '../components/Calendar'
import Chevron from '../components/Chevron'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { makeGMTDate, dateToISODateString } from '../components/Time'
import Reminder from '../components/Reminder'
import ErrorMessage, { ErrorList } from '../components/ErrorMessage'
import { windowExists } from '../utils/windowExists'
import CalendarNoJS from '../components/CalendarNoJS'
import CancelButton from '../components/CancelButton'
import { Checkbox } from '../components/forms/MultipleChoice'
import { checkURLParams } from '../utils/url'
import { logEvent } from '../utils/analytics'
import {
  getEndMonthName,
  getStartMonthName,
  getDaysOfWeekForLocation,
  dayFromDayNumber,
  getStartMonth,
  getInitialMonth,
  getMonthName,
} from '../utils/calendarDates'

import parse from 'date-fns/parse'

const DAY_LIMIT = 3

const headerStyles = css`
  font-weight: 400;
  margin-bottom: ${theme.spacing.xl};
  margin-top: 0;

  strong {
    font-weight: 700;
  }
`

const CalendarHeader = styled(H1)`
  font-size: ${theme.font.xl};
  ${headerStyles};
`

const CalendarSubheader = styled(H2)`
  font-size: ${theme.font.lg};
  ${headerStyles};
`

const CalReminder = styled(Reminder)`
  padding: ${theme.spacing.md} 0;
`

const fullWidth = css`
  width: 100% !important;
`

const CalHeader = ({
  locale = 'en',
  path,
  headerMonth = '',
  headerNote = [],
}) => {
  return (
    <div>
      <Title path={path} />
      <TopContainer>
        <nav>
          <NavLink className="chevron-link" to="/register">
            <Chevron dir="left" />
            <Trans>Go back</Trans>
          </NavLink>
        </nav>
      </TopContainer>
      <CalendarHeader id="calendar-header">
        <Trans>Select</Trans>{' '}
        <strong>
          <Trans>3 days</Trans>
        </strong>{' '}
        <Trans>you’re available between</Trans>{' '}
        {getStartMonthName(new Date(), locale)} <Trans>and</Trans>{' '}
        {getEndMonthName(new Date(), locale)}.
      </CalendarHeader>

      {windowExists() && (
        <CalendarSubheader id="calendar-intro">
          <Trans>Citizenship appointments in</Trans> {headerMonth}{' '}
          <Trans>are scheduled on </Trans>
          {headerNote}.
        </CalendarSubheader>
      )}
    </div>
  )
}

CalHeader.propTypes = {
  locale: PropTypes.string,
  path: PropTypes.string.isRequired,
  headerMonth: PropTypes.string,
  headerNote: PropTypes.array,
}

const CalBottom = ({ submit }) => {
  return (
    <div>
      <div>
        <CalReminder>
          <Trans>
            Make sure you stay available on all of the days you select.
          </Trans>
        </CalReminder>
      </div>
      <BottomContainer>
        {submit()}
        <CancelButton />
      </BottomContainer>
    </div>
  )
}

CalBottom.propTypes = {
  submit: PropTypes.func,
}

class CalendarPage extends Component {
  static get fields() {
    return getFieldNames(CalendarFields)
  }

  static validate(values) {
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
    this.initialMonth = this.initialMonth.bind(this)
    this.hasNotValid = this.hasNotValid.bind(this)
    this.form = null
    this.state = {
      month: this.initialMonth(),
      headerMonth: '',
      headerNote: [],
      calValues: false,
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
    this.setState({ calValues: values })
  }

  initialMonth() {
    let { context: { store: { calendar = {} } = {} } = {} } = this.props

    // we aren't going to check for a no-js submission because currently nothing happens when someone presses "review request"

    // cast values to Date objects if calendar.selectedDays exists and has a length
    if (calendar && calendar.selectedDays && calendar.selectedDays.length) {
      calendar = {
        selectedDays: calendar.selectedDays.map(day => makeGMTDate(day)),
      }
    }

    const startMonth = parse(getStartMonth())
    const initialMonth = getInitialMonth(calendar.selectedDays, startMonth)
    return initialMonth
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

    // values.selectedDays is an array of dates, so cast them to ISO date strings
    values = {
      selectedDays: values.selectedDays.map(date => dateToISODateString(date)),
    }
    await this.props.context.setStore(this.props.match.path.slice(1), values)

    await this.props.history.push('/review')
  }

  render() {
    let {
      context: { store: { calendar = {}, language: locale = 'en' } = {} } = {},
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
            let err

            const notValid = this.hasNotValid()

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
                <div>
                  <div
                    id="submit-error"
                    tabIndex="-1"
                    className={focusRing}
                    ref={errorContainer => {
                      this.errorContainer = errorContainer
                    }}
                  >
                    <ErrorMessage
                      message={err ? err : ''}
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
                  />
                </div>
                <CalBottom
                  submit={() => {
                    return (
                      <Button disabled={submitting}>
                        <Trans>Review request</Trans>
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

class NoJS extends Component {
  static get fields() {
    return ['selectedDays']
  }

  static get redirect() {
    return '/review'
  }

  static validate(values) {
    if (values && values.selectedDays && values.selectedDays.length === 3) {
      return {}
    }
    return {
      selectedDays: <Trans>You must select 3 days.</Trans>,
    }
  }

  constructor(props) {
    super(props)
    this.hasNotValid = this.hasNotValid.bind(this)
  }

  hasNotValid() {
    return this.props.location.search.indexOf('not-valid') !== -1
  }

  render() {
    let {
      context: { store: { calendar = {}, language: locale = 'en' } = {} } = {},
    } = this.props
    let errorsNoJS = {}

    // only run this if there's a location.search
    // AND at least one of our fields exists in the url keys somewhere
    // so we know for sure they pressed "submit" on this page
    if (
      (this.props.location.search &&
        this.props.location.pathname === '/calendar' &&
        checkURLParams(this.props.location.search, NoJS.fields)) ||
      this.hasNotValid()
    ) {
      errorsNoJS = NoJS.validate(calendar)
    }

    return (
      <Layout>
        <CalHeader locale={locale} path={this.props.match.path} />
        {Object.keys(errorsNoJS).length ? (
          <ErrorList message={errorsNoJS.selectedDays}>
            <a href="#selectedDays-form">Calendar</a>
          </ErrorList>
        ) : (
          ''
        )}
        {/*
          the first checkbox / radio on the page doesn't have its CSS applied correctly
          so this is a dummy checkbox that nobody should ever see
          it's also outside of the form so it can't be submitted
          if it is removed, the first checkbox in the list of dates will disappear
        */}
        <div style={{ display: 'none' }}>
          <Checkbox id="ignore-me" value="ignore-me" />
        </div>
        <form id="selectedDays-form" className={fullWidth}>
          <span>
            <CalendarNoJS dates={calendar} locale={locale} />
            <CalBottom
              submit={() => {
                return (
                  <Button>
                    <Trans>Review request</Trans>
                  </Button>
                )
              }}
            />
          </span>
        </form>
      </Layout>
    )
  }
}
NoJS.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
  location: PropTypes.object,
}

const WhichCal = () => {
  if (windowExists()) {
    return CalendarPage
  }

  return NoJS
}

export default withContext(WhichCal())
