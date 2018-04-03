import React from 'react'
import { NavLink } from 'react-router-dom'

class CalendarPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Calendar</h1>
        <p>
          This is the calendar page{' '}
          <span role="img" aria-label="calendar emoji">
            📆
          </span>
        </p>
        <br />
        <NavLink to="/availability">Availability →</NavLink>
      </div>
    )
  }
}

export default CalendarPage
