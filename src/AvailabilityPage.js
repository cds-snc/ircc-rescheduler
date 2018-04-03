import React from 'react'
import { NavLink } from 'react-router-dom'

class AvailabilityPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Availability</h1>
        <p>
          This is the availability page{' '}
          <span role="img" aria-label="sun emoji">
            ☀️
          </span>{' '}
          <span role="img" aria-label="moon emoji">
            🌖
          </span>
        </p>
        <br />
        <NavLink to="/confirmation">Confirmation →</NavLink>
      </div>
    )
  }
}

export default AvailabilityPage
