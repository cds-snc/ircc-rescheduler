import React from 'react'
import { NavLink } from 'react-router-dom'

class ConfirmationPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Confirmation</h1>
        <p>
          This is the confirmation page{' '}
          <span
            role="img"
            aria-label="envelope with downwards arrow above emoji"
          >
            📩
          </span>
        </p>
        <br />
        <NavLink to="/">← Start over</NavLink>
      </div>
    )
  }
}

export default ConfirmationPage
