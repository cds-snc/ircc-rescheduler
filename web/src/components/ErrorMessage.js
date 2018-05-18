import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'

const errorMessage = css`
  color: red;
  display: block;
`

class ValidationMessage extends React.Component {
  render() {
    return (
      <span className={errorMessage} id={this.props.id}>
        {this.props.message}
      </span>
    )
  }
}

ValidationMessage.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  id: PropTypes.string,
}

/**
 * ErrorMessage.js
 *
 * The only required prop is `message` which is the text used when announcing
 * the message to the screen reader user.
 */
class ErrorMessage extends React.Component {
  render() {
    return (
      <span
        className={errorMessage}
        id={this.props.id}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        {this.props.message}
      </span>
    )
  }
}

ErrorMessage.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  id: PropTypes.string,
}

export { ErrorMessage as default, ValidationMessage }
