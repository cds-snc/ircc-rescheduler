import React from 'react'
import { NavLink } from 'react-router-dom'
import { injectGlobal } from 'emotion'
import { css } from 'react-emotion'
import { mediaQuery, theme, H1, H2, Content } from './styles'
import PageHeader from './PageHeader'
import AlphaBanner from './AlphaBanner'
import FederalBanner from './FederalBanner'
import Footer from './Footer'
import Button from './forms/Button'

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
`

class HomePage extends React.Component {
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
              <H2>
                <label htmlFor="last-name" id="last-name-label">
                  Full name
                </label>
              </H2>
              <input type="text" name="last-name" id="last-name" />

              <H2>
                <label htmlFor="uci-number" id="uci-number-label">
                  UCI number
                </label>{' '}
                (eg A123456)
              </H2>

              <p id="uci-number-details">
                The number is at the top of the email we sent you
              </p>
              <input
                type="text"
                name="uci-number"
                id="uci-number"
                aria-labelledby="uci-number-label uci-number-details"
              />

              <H2>
                <label htmlFor="reason" id="reason-label">
                  Reason for rescheduling
                </label>
              </H2>
              <input type="text" name="reason" id="reason" />

              <H2>
                <label htmlFor="explanation" id="explanation-label">
                  Tell us why you can’t attend your appointment
                </label>
              </H2>
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
                <Button>Next →</Button>
              </NavLink>
            
          </Content>
        </main>
        <Footer topBarBackground="black" />
      </div>
    )
  }
}

export default HomePage
