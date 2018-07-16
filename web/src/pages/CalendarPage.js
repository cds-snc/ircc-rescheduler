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
import Layout from '../components/Layout'
import Button from '../components/forms/Button'
import CalendarAdapter from '../components/Calendar'
import Chevron from '../components/Chevron'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { makeGMTDate, dateToISODateString } from '../components/Time'
import Reminder from '../components/Reminder'
import { ErrorList } from '../components/ErrorMessage'
import { windowExists } from '../utils/windowExists'
import CalendarNoJS from '../components/CalendarNoJS'
import CancelButton from '../components/CancelButton'
import { Checkbox } from '../components/forms/MultipleChoice'
import { getEndMonthName, getStartMonthName } from '../utils/calendarDates'
import { HashLink } from 'react-router-hash-link'

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
  font-family: ${theme.weight.r}, Helvetica;
  ${headerStyles};
`

const CalendarSubheader = styled(H2)`
  font-size: ${theme.font.lg};
  font-family: ${theme.weight.r}, Helvetica;
  ${headerStyles};
`

const CalReminder = styled(Reminder)`
  padding: ${theme.spacing.md} 0;
`

const fullWidth = css`
  width: 100% !important;
`

const labelNames = id => {
  switch (id) {
    case 'selectedDays':
      return <Trans>Calendar</Trans>
    default:
      return ''
  }
}

const CalHeader = ({ locale = 'en' }) => {
  return (
    <div>
      <TopContainer>
        <nav>
          <NavLink className="chevron-link" to="/register">
            <Chevron dir="left" />
            <Trans>Go back</Trans>
          </NavLink>
        </nav>
      </TopContainer>
      <CalendarHeader>
        <Trans>
          Citizenship appointments are scheduled on Wednesdays and Thursdays.
        </Trans>
      </CalendarHeader>
      <CalendarSubheader>
        <Trans>Select</Trans>{' '}
        <strong>
          <Trans>3 days</Trans>
        </strong>{' '}
        <Trans>you’re available between</Trans>{' '}
        {getStartMonthName(new Date(), locale)} <Trans>and</Trans>{' '}
        {getEndMonthName(new Date(), locale)}
      </CalendarSubheader>
    </div>
  )
}

CalHeader.propTypes = {
  locale: PropTypes.string,
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
    const validate = new Validator(values, CalendarFields, defaultMessages)

    if (validate.passes()) {
      return {}
    }

    return getFieldErrorStrings(validate)
  }

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = CalendarPage.validate
  }

  async onSubmit(values, event) {
    const submitErrors = this.validate(values)

    if (Object.keys(submitErrors).length) {
      window.scrollTo(0, this.errorContainer.offsetTop - 20)
      this.errorContainer.focus()

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

    return (
      <Layout>
        <CalHeader locale={locale} />
        <Form
          onSubmit={this.onSubmit}
          initialValues={calendar}
          render={({
            handleSubmit,
            reset,
            submitting,
            pristine,
            values,
            errors,
            submitError,
          }) => (
            <form onSubmit={handleSubmit} className={fullWidth}>
              <div>
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
                      <HashLink to={`#${formId}`} key={i}>
                        {labelNames(formId) ? labelNames(formId) : formId}
                        <br />
                      </HashLink>
                    ))}
                  </ErrorList>
                </div>
                <Field
                  name="selectedDays"
                  id="selectedDays"
                  tabIndex={-1}
                  component={CalendarAdapter}
                  dayLimit={DAY_LIMIT}
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
          )}
        />
      </Layout>
    )
  }
}
CalendarPage.propTypes = {
  ...contextPropTypes,
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

  render() {
    let {
      context: { store: { calendar = {}, language: locale = 'en' } = {} } = {},
    } = this.props
    let errorsNoJS = {}

    // only run this if there's a location.search
    // AND at least one of our fields exists in the string somewhere
    // so we know for sure they pressed "submit" on this page
    if (
      this.props.location.search &&
      NoJS.fields.some(field => this.props.location.search.includes(field))
    ) {
      errorsNoJS = NoJS.validate(calendar)
    }

    return (
      <Layout>
        <CalHeader locale={locale} />
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
  location: PropTypes.object.isRequired,
}

const WhichCal = () => {
  if (windowExists()) {
    return CalendarPage
  }

  return NoJS
}

export default withContext(WhichCal())
