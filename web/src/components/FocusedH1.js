import React, { Component } from 'react'
import { css } from 'react-emotion'
import { theme } from '../styles'

const h1Style = css`
  font-size: ${theme.font.xl};
  font-weight: 400;
  margin-bottom: ${theme.spacing.xl};
  margin-top: 0;
  outline:0;
`

class FocusedH1 extends Component {
  state = {}
  constructor(props) {
    super(props)
    // Create a ref to store the textInput DOM element
    this.focusEl = React.createRef()
  }

  componentDidMount() {
    this.focusEl.current.focus()
  }

  render() {
    return (
      <h1 className={h1Style} tabIndex={0} ref={this.focusEl}>
        {this.props.children}
      </h1>
    )
  }
}

export default FocusedH1
