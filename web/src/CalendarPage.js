import React, { Component } from 'react'
import { Trans } from 'lingui-react'
import { NavLink } from 'react-router-dom'
import { CalHeader, CalReminder, Bold } from './styles'
import Layout from './Layout'
import Button from './forms/Button'
import Calendar from './Calendar'

class CalendarPage extends Component {
  render() {
    return (
      <Layout>
        <NavLink to="/">
          <Trans>← Go Back</Trans>
        </NavLink>
        {/* TODO: add bottom spacing to Go Back links */}
        <br />
        <br />

        <CalHeader>
          <Trans>
            Citizenship Tests are scheduled on <Bold>Tuesdays</Bold> and{' '}
            <Bold>Fridays</Bold>. Use the calendar to select{' '}
            <Bold>at least four days you’re available</Bold> in June and July.
          </Trans>
        </CalHeader>
        <Calendar />
        <CalReminder>
          <Trans>
            Remember: make sure to stay available on all of the days you select
          </Trans>
        </CalReminder>
        <NavLink to="/confirmation">
          <Button>
            <Trans>Review →</Trans>
          </Button>
        </NavLink>
        <NavLink to="/">
          <Trans>Cancel</Trans>
        </NavLink>
      </Layout>
    )
  }
}

export default CalendarPage
