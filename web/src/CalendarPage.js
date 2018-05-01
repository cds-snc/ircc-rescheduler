import React, { Component } from 'react'
import { Trans } from 'lingui-react'
import { NavLink } from 'react-router-dom'
import {
  visuallyhidden,
  CalHeader,
  CalReminder,
  Bold,
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
        <Calendar />
        <CalReminder>
          <Trans>
            Remember: make sure to stay available on all of the days you select
          </Trans>
        </CalReminder>
        <BottomContainer>
          <NavLink to="/review">
            <Button>
              <Trans>Review →</Trans>
            </Button>
          </NavLink>

          <div>
            <NavLink to="/">
              <Trans>Cancel</Trans>
            </NavLink>
          </div>
        </BottomContainer>
      </Layout>
    )
  }
}

export default CalendarPage
