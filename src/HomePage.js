import React from 'react'
import { NavLink } from 'react-router-dom'

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Register</h1>
        <p>
          Enter last name and UCI number{' '}
          <span role="img" aria-label="writing hand emoji">
            ✍️
          </span>
        </p>
        <br />
        <NavLink to="/calendar">Calendar →</NavLink>
      </div>
    )
  }
}

export default HomePage
