import React from 'react'
import { NavLink } from 'react-router-dom'

class CalendarPage extends React.Component {
  render() {
    return (
      <div>
        <main role="main">
          <section>
            <header>Reschedule your Canadian Citizenship appointment</header>
          </section>
          <section>
            <h1>Calendar</h1>

            <h2>
              Use the calendar to{' '}
              <strong>
                select all the days you’re AVAILABLE between May and June 2018
              </strong>{' '}
              so we can schedule your new appointment.
            </h2>
            {/* what is "help"??? */}
            <div>Calendar</div>
            <p>
              <strong>
                Remember: make sure to stay available on all of the days you
                select
              </strong>
            </p>

            <NavLink to="/">← Back</NavLink>
            <NavLink to="/availability">Next →</NavLink>
          </section>
        </main>
      </div>
    )
  }
}

export default CalendarPage
