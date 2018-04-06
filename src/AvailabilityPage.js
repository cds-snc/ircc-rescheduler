import React from 'react'
import { NavLink } from 'react-router-dom'
import { H1, H2, Content } from './styles'
import PageHeader from './PageHeader'
import AlphaBanner from './AlphaBanner'
import FederalBanner from './FederalBanner'
import Footer from './Footer'

class AvailabilityPage extends React.Component {
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
            <form>
              <fieldset>
                <legend>
                  <H2>
                    When is the <strong>most convenient time</strong> to
                    schedule your new appointment?
                  </H2>
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
            <NavLink to="/calendar">← Back</NavLink>
            <NavLink to="/confirmation">Send request →</NavLink>
          </Content>
          <Footer topBarBackground="black" />
        </main>
      </div>
    )
  }
}

export default AvailabilityPage
