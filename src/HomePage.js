import React from 'react'
import { NavLink } from 'react-router-dom'
import { injectGlobal } from 'emotion'
import { css } from 'react-emotion'
import { mediaQuery, theme, H1, H2, Content, TextLink } from './styles'
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

#name-details, #uci-number-details,
#explanation-details, #reason-details {
    margin-top: ${theme.spacing.xs};
}

ul {
  padding-left: 0em;
  list-style: none;
}

input[type="text"] {
    border: solid 0.2em black;
    width: 50%;
    height: 2em;
}

input[type="radio"] {
    display: none;
}

input[type="radio"] + label {
    color: ${theme.font.black};
    font-family: ${theme.weight.m};
    font-size: ${theme.font.md};

}
input[type="radio"] + label span {
    display: inline-block;
    width: 22px;
    height: 22px;
    vertical-align: middle;
    cursor: pointer;
    margin-right: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.sm};
    border-radius: 50%;
}

input[type="radio"] + label span {
  background: url('https://cdn.rawgit.com/nmakuch/60034bd0d4b98c57dd90776b9816731f/raw/4dd00e085a17b996d8a7b6e9ffde14f02e7aae0a/empty.svg');
  margin-top: ${theme.spacing.sm};
}

input[type="radio"]:checked + label span{
  background: url('https://cdn.rawgit.com/nmakuch/e3cd68811dbc645d5c93e2b1626ddb2e/raw/6a1cd0e9541615fd3316063487bd6d702ad88a5d/checked.svg');
}

textarea {
  width: 60%;
  height: 15em;
  border: solid 0.2em black;
  margin-top: ${theme.spacing.md};
  resize: none;
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
            <H1>Request a new Canadian Citizenship test date</H1>
          </PageHeader>

          <Content>
            <form>
              <H2>
                <label htmlFor="last-name" id="last-name-label">
                  Full name
                </label>
              </H2>
              <p id="name-details">
                This is the full name you used on your citizenship application.
              </p>
              <input type="text" name="last-name" id="last-name" />
              <H2>
                <label htmlFor="uci-number" id="uci-number-label">
                  UCI number
                </label>{' '}
                (A123456)
              </H2>
              <p id="uci-number-details">
                This number is at the top of the email we sent you.
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
              <p id="reason-details">
                {' '}
                If you’re not sure if you can reschedule,{' '}
                <TextLink>read the guidelines for rescheduling.</TextLink>{' '}
              </p>

              <ul>
                <li>
                  <input type="radio" name="reason-travel" id="reason-travel" />{' '}
                  <label htmlFor="reason-travel" id="travel-label">
                    <span /> Travel
                  </label>
                </li>

                <li>
                  <input
                    type="radio"
                    name="reason-medical"
                    id="reason-medical"
                  />{' '}
                  <label htmlFor="reason-medical" id="medical-label">
                    <span /> Medical
                  </label>
                </li>

                <li>
                  <input type="radio" name="reason-work" id="reason-work" />{' '}
                  <label htmlFor="reason-work" id="work-label">
                    <span /> Work or school
                  </label>
                </li>

                <li>
                  <input type="radio" name="reason-family" id="reason-family" />{' '}
                  <label htmlFor="reason-family" id="family-label">
                    <span /> Family
                  </label>
                </li>

                <li>
                  <input type="radio" name="reason-other" id="reason-other" />{' '}
                  <label htmlFor="reason-other" id="other-label">
                    <span /> Other
                  </label>
                </li>
              </ul>
              <H2>
                <label
                  className="explanation-header"
                  htmlFor="explanation"
                  id="explanation-label"
                >
                  Briefly tell us why you cant attend your test
                </label>
              </H2>

              <textarea
                name="explanation"
                id="explanation"
                className="explanation-input"
                aria-labelledby="explanation-label explanation-details"
              />
            </form>
            <br />
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
