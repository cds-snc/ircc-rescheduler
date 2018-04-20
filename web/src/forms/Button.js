import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { theme, roundedEdges, mediaQuery, incrementColor } from '../styles'

const button = css`
  font-size: ${theme.font.lg};
  font-family: ${theme.weight.s};
  color: ${theme.colour.white};
  background-color: ${theme.colour.gray};
  border: 5px solid transparent;
  outline: 0;
  padding: ${theme.spacing.xs} ${theme.spacing.lg};
  cursor: pointer;
  ${roundedEdges};

  ${mediaQuery.small(css`
    width: 100%;
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
  `)};

  &:focus {
    outline: 4px solid ${theme.colour.focus};
    outline-offset: -1px;
  }

  &:hover,
  &:active,
  &:focus {
    background-color: ${incrementColor(theme.colour.gray, 20)};
  }

  &:active,
  &:disabled {
    filter: alpha(opacity=60);
    opacity: 0.6;
  }

  &:disabled {
    &:hover {
      cursor: not-allowed;
      background-color: ${incrementColor(theme.colour.gray, 30)};
    }
  }
`

const Button = ({ disabled = false, children }) => (
  <button className={button} type="submit" disabled={disabled}>
    {children}
  </button>
)

/* validation to make sure only one child is passed in */
Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.any,
}

export default Button
