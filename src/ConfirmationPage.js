import React from 'react'
import { NavLink } from 'react-router-dom'

class ConfirmationPage extends React.Component {
  render() {
    return (
      <div>
        <main role="main">
          <section>
            <header>Reschedule your Canadian Citizenship appointment</header>
          </section>
          <section>
            <h1>Thank you! Your request has been received.</h1>
            <p>We’ve sent you a confirmation email.</p>

            <h2>What happens next?</h2>
            <p>
              Your local immigration office will send you a new appointment, or
              email you to ask for more information.
            </p>

            <h2>If you have any questions, please contact:</h2>
            <p>upto4monthsresponsetime@gc.ca</p>
            <p>(905) 823-8113</p>
          </section>
        </main>
      </div>
    )
  }
}

export default ConfirmationPage
