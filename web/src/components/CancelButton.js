import React, { Component } from 'react'
import { css } from 'react-emotion'
import { theme } from '../styles'
import { NavLink } from 'react-router-dom'

const cancelStyles = css`
  background-color: transparent;
  border: none;
  font-size: ${theme.font.base};
  color: ${theme.colour.blue};
  text-decoration: underline;

  &:hover {
    cursor: pointer;
  }
`

class CancelButton extends Component {
  state = {}
  render() {
    return (
      <div>
        <NavLink to="/clear">
          <button className={cancelStyles}>cancel request</button>
        </NavLink>
      </div>
    )
  }
}

export default CancelButton
