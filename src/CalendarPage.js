import React from 'react'
import { NavLink } from 'react-router-dom'
import { H1, Content, Bold, Calendar } from './styles'
import PageHeader from './PageHeader'
import AlphaBanner from './AlphaBanner'
import FederalBanner from './FederalBanner'
import Footer from './Footer'

class CalendarPage extends React.Component {
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
            <H1>Reschedule your Canadian Citizenship appointment</H1>
          </PageHeader>
          <Content>
            <p>
              Use the calendar to{' '}
              <Bold>
                select all the days you’re AVAILABLE between May and June 2018
              </Bold>{' '}
              so we can schedule your new appointment.
            </p>
            {/* what is "help"??? */}
            <Calendar />
            <p>
              <strong>
                Remember: make sure to stay available on all of the days you
                select
              </strong>
            </p>

            <NavLink to="/">← Back</NavLink>
            <NavLink to="/availability">Next →</NavLink>
          </Content>
          <Footer topBarBackground="black" />
        </main>
      </div>
    )
  }
}

export default CalendarPage
