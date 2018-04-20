import React, { Component } from 'react'
import { Trans } from 'lingui-react'
import { NavLink } from 'react-router-dom'
import { css } from 'react-emotion'
import {
  theme,
  visuallyhidden,
  CalHeader,
  CalReminder,
  Bold,
  BottomContainer,
  TopContainer,
} from './styles'
import Layout from './Layout'
import Button from './forms/Button'
import { Calendar } from './Calendar'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const DAY_LIMIT = 3

const onSubmit = async values => {
  await sleep(300)

  if (!values.calendar || values.calendar.length === 0) {
    return {
      [FORM_ERROR]: (
        <Trans>
          Please pick 3 dates so we can schedule your test when it’s convenient
          for you.
        </Trans>
      ),
    }
  } else if (values.calendar.length < DAY_LIMIT) {
    let datesRemaining = DAY_LIMIT - values.calendar.length
    let dateString = datesRemaining === 1 ? 'date' : 'dates'
    return {
      [FORM_ERROR]: `Please pick ${datesRemaining} more ${dateString} so we can schedule your test when it’s convenient for you.`,
    }
  }
  window.alert('CALENDAR SUCCESS!')
}

const errorClass = css`
  display: block;
  color: red;
  margin-bottom: ${theme.spacing.sm};
`

class CalendarPage extends Component {
  render() {
    return (
      <Layout>
        <h1 className={visuallyhidden}>
          Now use the calendar to tell us when you’re available.
        </h1>
        <TopContainer>
          <nav>
            <NavLink to="/register">
              <Trans>← Go Back</Trans>
            </NavLink>
          </nav>
        </TopContainer>

        <CalHeader>
          <Trans>
            Citizenship Tests are scheduled on <Bold>Tuesdays</Bold> and{' '}
            <Bold>Fridays</Bold>. Use the calendar to select{' '}
            <Bold>at least four days you’re available</Bold> in June and July.
          </Trans>
        </CalHeader>
        <Form
          onSubmit={onSubmit}
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
                {submitError ? (
                  <span className={errorClass}>
                    <strong>{submitError}</strong>
                  </span>
                ) : (
                  ''
                )}
                <Field
                  name="calendar"
                  component={Calendar}
                  dayLimit={DAY_LIMIT}
                />
              </div>

              <CalReminder>
                <Trans>
                  Remember: make sure to stay available on all of the days you
                  select
                </Trans>
              </CalReminder>
              <BottomContainer>
                <Button disabled={submitting}>
                  <Trans>Review →</Trans>
                </Button>

                <div>
                  <NavLink to="/">
                    <Trans>Cancel</Trans>
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

export default CalendarPage
