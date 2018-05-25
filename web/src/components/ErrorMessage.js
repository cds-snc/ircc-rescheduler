import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import { theme, H2 } from '../styles'

const errorMessage = css`
  color: ${theme.colour.red};
  display: block;
`

const errorList = css`
  a {
    color: ${theme.colour.red};
    font-weight: 700;
  }

  p {
    font-size: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.sm};
  }

  margin-bottom: ${theme.spacing.xl};
`

class ErrorList extends React.Component {
  render() {
    return (
      <div className={errorList}>
        <H2>{this.props.message}</H2>
        {this.props.message ? (
          <div>
            <p>Please take another look at the:</p>
            {this.props.children}
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

class ValidationMessage extends React.Component {
  render() {
    return (
      <span
        className={`${this.props.message ? '' : 'empty '}${errorMessage}`}
        id={this.props.id}
      >
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
        className={`${this.props.message ? '' : 'empty '}${errorMessage}`}
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

export { ErrorMessage as default, ValidationMessage, ErrorList }
