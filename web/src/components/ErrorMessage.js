import React from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'lingui-react'
import { css } from 'react-emotion'
import { theme } from '../styles'

export const errorMessage = css`
  color: ${theme.colour.red};
  display: block;
  margin-top: ${theme.spacing.sm};
`

export const errorList = css`
  a {
    font-family: ${theme.weight.b}, Helvetica, Arial, sans-serif;
    color: ${theme.colour.red};
    font-weight: 700;
  }

  p {
    font-size: ${theme.font.md};
    margin-bottom: ${theme.spacing.sm};
  }

  h2 {
    font-family: ${theme.weight.b}, Helvetica, Arial, sans-serif;
    margin-top: 0 !important;
    margin-bottom: ${theme.spacing.sm};
  }

  border: solid 2px red;
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`

const noError = css`
  display: none;
`

class ErrorList extends React.Component {
  constructor(props) {
    super(props)
    this.isEmpty = this.isEmpty.bind(this)
  }

  isEmpty() {
    let children =
      typeof this.props.children === 'object'
        ? Object.keys(this.props.children)
        : this.props.children

    return !(this.props.message && children && children.length)
  }

  render() {
    return (
      <div className={this.isEmpty() ? `empty ${noError}` : errorList}>
        {this.isEmpty() ? (
          ''
        ) : (
          <div>
            <h2>{this.props.message}</h2>
            <p>
              <Trans>Please check these sections for errors:</Trans>
            </p>
            <ul>
              {Array.isArray(this.props.children) ? (
                this.props.children.map((child, i) => <li key={i}>{child}</li>)
              ) : (
                <li>{this.props.children}</li>
              )}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

ErrorList.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  id: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
}

class ValidationMessage extends React.Component {
  render() {
    return (
      <span
        className={`${
          this.props.message ? '' : `empty ${noError}`
        }${errorMessage}`}
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
  constructor(props) {
    super(props)
    this.isEmpty = this.isEmpty.bind(this)
  }

  isEmpty() {
    return !(this.props.message ? true : false)
  }

  render() {
    return (
      <span
        className={this.isEmpty() ? `empty ${noError}` : errorMessage}
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
