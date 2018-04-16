import React, { Component } from 'react'
import { Trans } from 'lingui-react'
import { NavLink } from 'react-router-dom'
import { H1, Content, CalHeader, CalReminder, Bold } from './styles'
import PageHeader from './PageHeader'
import AlphaBanner from './AlphaBanner'
import FederalBanner from './FederalBanner'
import Footer from './Footer'
import Button from './forms/Button'
import Calendar from './Calendar'

class CalendarPage extends Component {
  render() {
    return (
      <div>
        <AlphaBanner>
          {' '}
          <span>
            <Trans>This is a new service we are constantly improving.</Trans>
          </span>{' '}
        </AlphaBanner>
        <FederalBanner />
        <main role="main">
          <PageHeader>
            <H1>
              <Trans>Request a new Canadian Citizenship test date</Trans>
            </H1>
          </PageHeader>
          <Content>
            <NavLink to="/">
              <p>
                <Trans>← Go Back</Trans>
              </p>
            </NavLink>

            <CalHeader>
              <Trans>
                Citizenship Tests are scheduled on <Bold>Tuesdays</Bold> and{' '}
                <Bold>Fridays</Bold>. Use the calendar to select{' '}
                <Bold>at least four days you’re available</Bold> in May and
                June.
              </Trans>
            </CalHeader>
            <Calendar />
            <CalReminder>
              <Trans>
                Remember: make sure to stay available on all of the days you
                select
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
          </Content>
          <Footer topBarBackground="black" />
        </main>
      </div>
    )
  }
}

export default CalendarPage
