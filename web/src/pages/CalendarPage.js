import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { contextPropTypes } from '../context'
import withProvider from '../withProvider'
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
import Layout from '../components/Layout'
import Button from '../components/forms/Button'
import CalendarAdapter from '../components/Calendar'
import Chevron from '../components/Chevron'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { makeGMTDate } from '../components/Time'
import Reminder from '../components/Reminder'
import { ErrorList } from '../components/ErrorMessage'
import { windowExists } from '../utils/windowExists'
import CalendarNoJS from '../components/CalendarNoJS'
import CancelButton from '../components/CancelButton'
import { Checkbox } from '../components/forms/MultipleChoice'

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

const listContainer = css`
  display: flex;
  margin-bottom: ${theme.spacing.xxl};
`

const CalReminder = styled(Reminder)`
  padding: ${theme.spacing.md} 0;
`

const labelNames = id => {
  switch (id) {
    case 'calendar':
      return <Trans>Calendar</Trans>
    default:
      return ''
  }
}

const CalHeader = () => {
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
          Citizenship appointments are scheduled on <strong>Wednesdays</strong>{' '}
          and <strong>Thursdays</strong>.
        </Trans>
      </CalendarHeader>
      <CalendarSubheader>
        <Trans>
          <strong>Select 3 days</strong> you’re available between August and
          September:
        </Trans>
      </CalendarSubheader>
    </div>
  )
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
    return ['calendar']
  }

  static validate(values) {
    const errors = {}
    if (!values.calendar || !values.calendar.length) {
      errors.calendar = <Trans>You must select 3 days.</Trans>
    } else if (values.calendar.length < DAY_LIMIT) {
      switch (values.calendar.length) {
        case 1:
          errors.calendar = (
            <Trans>
              You must select 3 days. Please select 2 more days to continue.
            </Trans>
          )
          break
        case 2:
          errors.calendar = (
            <Trans>
              You must select 3 days. Please select 1 more day to continue.
            </Trans>
          )
          break
        default:
          errors.calendar = <Trans>You must select 3 days.</Trans>
      }
    }
    return errors
  }

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = CalendarPage.validate
  }

  async onSubmit(values, event) {
    const submitErrors = this.validate(values)

    if (Object.keys(submitErrors).length) {
      this.errorContainer.focus()
      return {
        [FORM_ERROR]: submitErrors.calendar,
      }
    }

    // if setStore doesn't exist, nothing gets saved between pages
    await this.props.context.setStore(this.props.match.path.slice(1), values)

    await this.props.history.push('/review')
  }

  render() {
    let { context: { store: { calendar = {} } = {} } = {} } = this.props
    // we aren't going to check for a no-js submission because currently nothing happens when someone presses "review request"

    // cast values to Date objects if calendar.calendar exists and has a length
    if (calendar && calendar.calendar && calendar.calendar.length) {
      calendar = { calendar: calendar.calendar.map(day => makeGMTDate(day)) }
    }

    return (
      <Layout>
        <CalHeader props={this.props} />
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
            <form onSubmit={handleSubmit}>
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
                      <a href={`#${formId}`} key={i}>
                        {labelNames(formId) ? labelNames(formId) : formId}
                        <br />
                      </a>
                    ))}
                  </ErrorList>
                </div>
                <Field
                  name="calendar"
                  id="calendar"
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
}

class NoJS extends Component {
  static get fields() {
    return ['calendar']
  }

  static get redirect() {
    return '/review'
  }

  static validate(values) {
    if (values && values.calendar && values.calendar.length === 3) {
      return {}
    }
    return {
      calendar: <Trans>You must select 3 days.</Trans>,
    }
  }

  render() {
    let { context: { store: { calendar } = {} } = {} } = this.props
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
        <CalHeader props={this.props} />
        {Object.keys(errorsNoJS).length ? (
          <ErrorList message={errorsNoJS.calendar}>
            <a href="#selectedDays">Calendar</a>
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
        <form>
          <div className={listContainer}>
            <CalendarNoJS dates={calendar} />
          </div>
          <CalBottom
            submit={() => {
              return (
                <Button>
                  <Trans>Review request</Trans>
                </Button>
              )
            }}
          />
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

export default withProvider(withContext(WhichCal()))
