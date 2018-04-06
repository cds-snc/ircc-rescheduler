import React from 'react'
import { NavLink } from 'react-router-dom'
import { injectGlobal } from 'emotion'
import { css } from 'react-emotion'
import { mediaQuery, theme } from './styles'
import AlphaBanner from './AlphaBanner'
import FederalBanner from './FederalBanner'
import Button from './forms/Button'
import Footer from './Footer'

injectGlobal`

html, body {
    padding: 0;
		margin: 0;
		background: ${theme.colour.white};
		height: 100%;
    font-family: ${theme.weight.l}, sans serif;
    font-size: ${theme.font.md};

    ${mediaQuery.small(css`
      font-size: ${theme.font.xs};
    `)};

	}

`

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <AlphaBanner />
        <FederalBanner />
        <main role="main">
          <section>
            <header>Reschedule your Canadian Citizenship appointment</header>
          </section>
          <section>
            <h1>Register</h1>

            <form>
              <h2>
                <label htmlFor="last-name" id="last-name-label">
                  Last name
                </label>
              </h2>
              <input type="text" name="last-name" id="last-name" />

              <h2>
                <label htmlFor="uci-number" id="uci-number-label">
                  UCI number
                </label>{' '}
                (eg A123456)
              </h2>

              <p id="uci-number-details">
                The number is at the top of the email we sent you
              </p>
              <input
                type="text"
                name="uci-number"
                id="uci-number"
                aria-labelledby="uci-number-label uci-number-details"
              />

              <h2>
                <label htmlFor="reason" id="reason-label">
                  Reason for rescheduling
                </label>
              </h2>
              <input type="text" name="reason" id="reason" />

              <h2>
                <label htmlFor="explanation" id="explanation-label">
                  Tell us why you can’t attend your appointment
                </label>
              </h2>
              <p id="explanation-details">
                If you’re not sure that you can reschedule, read the guidelines
                for scheduling.
              </p>
              <input
                type="text"
                name="explanation"
                id="explanation"
                aria-labelledby="explanation-label explanation-details"
              />
            </form>
            <NavLink to="/calendar">
              <br />
              <Button>Next</Button>
            </NavLink>
          </section>
        </main>
        <Footer />
      </div>
    )
  }
}

export default HomePage
