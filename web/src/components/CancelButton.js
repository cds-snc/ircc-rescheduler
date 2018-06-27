import React, { Component } from 'react'
import { css } from 'react-emotion'
import { theme } from '../styles'

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
        <a href="/clear" className={cancelStyles}>
          cancel request
        </a>
      </div>
    )
  }
}

export default CancelButton
