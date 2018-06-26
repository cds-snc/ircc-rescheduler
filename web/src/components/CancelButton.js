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
        <form action="/cancel" method="post">
          <button className={cancelStyles}>cancel request</button>
        </form>
      </div>
    )
  }
}

export default CancelButton
