import React from 'react'
import { NavLink } from 'react-router-dom'
import { injectGlobal } from 'emotion'
import { css } from 'react-emotion'
import { mediaQuery, theme } from './styles'
import PageHeader from './PageHeader'
import AlphaBanner from './AlphaBanner'
import FederalBanner from './FederalBanner'
import Footer from './Footer'

injectGlobal`

html, body {
    padding: 0;
		margin: 0;
		background: ${theme.colour.white};
		height: 100%;
    font-family: ${theme.weight.l};
    font-size: ${theme.font.md};

    ${mediaQuery.small(css`
      font-size: ${theme.font.xs};
    `)};
	}

.title {
    font-size: ${theme.font.lg2};
    font-family: ${theme.weight.b};
}

.content {
  padding: 0 0 ${theme.spacing.xxxl} ${theme.spacing.xxxl};
}
`

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <AlphaBanner>
          {' '}
          <span>This is an internal service</span>{' '}
        </AlphaBanner>
        <FederalBanner />
        <main role="main">
          <PageHeader>
            <h1 className="title">
              Reschedule your Canadian <br /> Citizenship appointment
            </h1>
          </PageHeader>

          <section className="content">
            <h2>Register</h2>

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
            <NavLink to="/calendar">Next →</NavLink>
          </section>
        </main>
        <Footer />
      </div>
    )
  }
}

export default HomePage
