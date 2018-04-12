import React, { Component } from 'react'
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
          <span>This is a new service we are constantly improving.</span>{' '}
        </AlphaBanner>
        <FederalBanner />
        <main role="main">
          <PageHeader>
            <H1>Request a new Canadian Citizenship test date</H1>
          </PageHeader>
          <Content>
            <NavLink to="/">
              <p>← Go Back</p>
            </NavLink>

            <CalHeader>
              Citizenship Tests are scheduled on <Bold>Tuesdays</Bold> and{' '}
              <Bold>Fridays</Bold>. Use the calendar to select{' '}
              <Bold>at least four days you’re available</Bold> in May and June.
            </CalHeader>
            <Calendar />
            <CalReminder>
              Remember: make sure to stay available on all of the days you
              select
            </CalReminder>

            <NavLink to="/confirmation">
              <Button>Review →</Button>
            </NavLink>
            <NavLink to="/">Cancel</NavLink>
          </Content>
          <Footer topBarBackground="black" />
        </main>
      </div>
    )
  }
}

export default CalendarPage
