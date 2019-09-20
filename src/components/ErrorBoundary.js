import { Component } from 'react'
import PropTypes from 'prop-types'

export class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    render: PropTypes.func.isRequired,
    onError: PropTypes.func,
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.onError) this.props.onError(error, errorInfo)
    this.setState({
      hasError: true,
      error,
      errorInfo,
    })
  }

  render() {
    let { hasError, error, errorInfo } = this.state
    if (hasError) {
      return this.props.render(error, errorInfo)
    } else {
      return this.props.children
    }
  }
}
