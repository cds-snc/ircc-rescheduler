import React, { Component } from 'react'
import { css } from 'react-emotion'
import { theme } from '../styles'

const h1Style = css`
  font-size: ${theme.font.xxl};
  font-weight: 400;
  margin-bottom: ${theme.spacing.xl};
  margin-top: 0;
  outline: 0;
`
class FocusedH1 extends Component {
  constructor(props) {
    super(props)
    this.focusEl = React.createRef()
    this.state = { label: false }
  }

  componentDidMount() {
    const node = this.focusEl.current
    this.setState({ label: node.innerText })
    node.focus()
  }

  render() {
    const { label } = this.state
    const { className, id } = this.props

    const props = {
      tabIndex: -1,
      className: className
        ? `${h1Style} ${this.props.className}`
        : `${h1Style}`,
    }

    // only add this prop if it has a value
    if (label) {
      props['aria-label'] = label
    }

    if (id) {
      props.id = id
    }

    return (
      <h1 ref={this.focusEl} {...props}>
        {this.props.children}
      </h1>
    )
  }
}

export default FocusedH1
