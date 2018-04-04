import React from 'react'
import { NavLink } from 'react-router-dom'
import { injectGlobal } from 'emotion'
import { css } from 'react-emotion'
import { mediaQuery, theme } from './styles'
import AlphaBanner from './AlphaBanner'

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
