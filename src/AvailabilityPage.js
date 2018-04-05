import React from 'react'
import { NavLink } from 'react-router-dom'

class AvailabilityPage extends React.Component {
  render() {
    return (
      <div>
        <main role="main">
          <section>
            <header>Reschedule your Canadian Citizenship appointment</header>
          </section>
          <section>
            <h1>Availability</h1>

            <form>
              <fieldset>
                <legend>
                  <h2>
                    When is the <strong>most convenient time</strong> to
                    schedule your new appointment?
                  </h2>
                </legend>
                <p>You can choose more than one option.</p>

                <input
                  type="checkbox"
                  id="availability-1"
                  name="availability"
                  value="morning"
                />
                <label htmlFor="availability-1">Morning (8am to 12pm)</label>
                <input
                  type="checkbox"
                  id="availability-2"
                  name="availability"
                  value="afternoon"
                />
                <label htmlFor="availability-2">Afternoon (12pm to 6pm)</label>
                <input
                  type="checkbox"
                  id="availability-2"
                  name="availability"
                  value="evening"
                />
                <label htmlFor="availability-3">Evening (6pm to 9pm)</label>
              </fieldset>
            </form>
          </section>

          <NavLink to="/calendar">← Back</NavLink>
          <NavLink to="/confirmation">Send request →</NavLink>
        </main>
      </div>
    )
  }
}

export default AvailabilityPage
