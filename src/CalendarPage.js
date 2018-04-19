import React, { Component } from 'react'
import { Trans } from 'lingui-react'
import { NavLink } from 'react-router-dom'
import {
  CalHeader,
  CalReminder,
  Bold,
  Cancel,
  BottomContainer,
  TopContainer,
} from './styles'
import Layout from './Layout'
import Button from './forms/Button'
import Calendar from './Calendar'

class CalendarPage extends Component {
  render() {
    return (
      <Layout>
        <TopContainer>
          <NavLink to="/">
            <Trans>← Go Back</Trans>
          </NavLink>
        </TopContainer>
        {/* TODO: add bottom spacing to Go Back links */}

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
        <BottomContainer>
          <NavLink to="/confirmation">
            <Button>
              <Trans>Review →</Trans>
            </Button>
          </NavLink>

          <NavLink to="/">
            <Cancel>
              <Trans>Cancel</Trans>
            </Cancel>
          </NavLink>
        </BottomContainer>
      </Layout>
    )
  }
}

export default CalendarPage
