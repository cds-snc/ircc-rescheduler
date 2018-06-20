import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
import { CalendarAdapter } from '../components/Calendar'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { GET_USER_DATA } from '../queries'
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

const validate = values => {
  const errors = {}
  if (!values.calendar || values.calendar.length < DAY_LIMIT) {
    errors.calendar = (
      <Trans>You have already selected the maximum number of dates!</Trans>
    )
  }
  return errors
}

class CalendarPage extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = { data: {} }
  }

  async componentDidMount() {
    try {
      // 'result' would also be to place to check for potential graphql errors
      let result = await this.props.client.query({
        query: GET_USER_DATA,
      })

      let { data } = result

      /* cast values to Date objects if selectedDays exists and has a length */
      if (data && data.selectedDays && data.selectedDays.length) {
        let selectedDays = data.selectedDays.map(day => makeGMTDate(day))

        this.setState({
          data: { calendar: selectedDays },
        })
      }
    } catch (err) {
      console.log(err) // eslint-disable-line no-console
    }
  }

  async onSubmit(values, event) {
    const submitErrors = validate(values)

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

    const { client } = this.props
    try {
      await client.mutate({
        mutation: gql`
          mutation($dates: [String]) {
            selectDays(data: $dates) @client
          }
        `,
        variables: { dates: values.calendar },
      })
    } catch (err) {
      //should be a logger
      console.log(err) // eslint-disable-line no-console
    }

    await this.props.history.push('/review')
  }

  render() {
    return (
      <Layout>
        <TopContainer>
          <nav>
            <NavLink to="/register">
              ← <Trans>Go Back</Trans>
            </NavLink>
          </nav>
        </TopContainer>

        <CalendarHeader>
          <Trans>
            Citizenship Tests are scheduled on <strong>Tuesdays</strong> and{' '}
            <strong>Fridays</strong>.
          </Trans>
        </CalendarHeader>
        <CalendarSubheader>
          <Trans>
            <strong>Select three (3) days you are available</strong> between
            July and September
          </Trans>
        </CalendarSubheader>

        <Form
          onSubmit={this.onSubmit}
          initialValues={this.state.data}
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
                    {Object.keys(validate(values)).map((formId, i) => (
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
                  <Trans>Review</Trans>
                </Button>

                <div>
                  <NavLink to="/">
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
  history: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
}

export default withApollo(CalendarPage)
