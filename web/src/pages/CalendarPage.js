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

const DAY_LIMIT = 3

const headerStyles = css`
  font-weight: 400;
  margin-bottom: ${theme.spacing.xl};

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

const labelNames = id => {
  switch (id) {
    case 'calendar':
      return <Trans>Calendar</Trans>
    default:
      return ''
  }
}

class CalendarPage extends Component {
  static get fields() {
    return ['calendar']
  }

  static validate(values) {
    const errors = {}
    if (!values.calendar || values.calendar.length < DAY_LIMIT) {
      errors.calendar = (
        <Trans>You have already selected the maximum number of dates!</Trans>
      )
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
        [FORM_ERROR]: (
          <Trans>
            Sorry, there was a problem with the information you submitted.
          </Trans>
        ),
      }
    }

    // if setState doesn't exist, nothing gets saved between pages
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
            Citizenship appointments are scheduled on <strong>Tuesdays</strong>{' '}
            and <strong>Fridays</strong>.
          </Trans>
        </CalendarHeader>
        <CalendarSubheader>
          <Trans>
            <strong>Select 3 days</strong> you’re available between July and
            September:
          </Trans>
        </CalendarSubheader>

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
              <div>
                <Reminder>
                  <Trans>
                    Make sure you stay available on all of the days you select.
                  </Trans>
                </Reminder>
              </div>
              <BottomContainer>
                <Button disabled={submitting}>
                  <Trans>Review request</Trans>
                </Button>

                <div>
                  <NavLink to="/cancel">
                    <Trans>Cancel request</Trans>
                  </NavLink>
                </div>
              </BottomContainer>
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
}

export default withProvider(withContext(CalendarPage))
