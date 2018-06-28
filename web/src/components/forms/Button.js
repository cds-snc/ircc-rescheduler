import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { theme, mediaQuery, incrementColor } from '../../styles'

const govuk_button = css`
  /* https://raw.githubusercontent.com/alphagov/govuk_frontend_toolkit/e00b009b2a9722363d3c247838632d8e3673daa9/stylesheets/design-patterns/_buttons.scss */
  background-color: #00823b;

  position: relative;
  display: inline-block;
  padding: 10px 15px 5px;
  border: none;
  border-radius: 0;
  outline: 1px solid transparent; // keep some button appearance when changing colour settings in browsers
  outline-offset: -1px; // fixes bug in Safari that outline width on focus is not overwritten, is reset to 0 on focus in govuk_template
  -webkit-appearance: none;

  // Bottom edge effect
  /* again, I don't have sass variables, so I'm using default colour */
  box-shadow: 0 2px 0 #003618;
  /* removed IE8-specific rule */

  // Text
  font-size: 1em; // inherit from parent
  line-height: 1.25;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;

  // Interaction
  cursor: pointer;

  &:visited {
    background-color: #00823b;
  }

  &:hover,
  &:focus {
    background-color: #00692f;
  }

  &:active {
    top: 2px;
    box-shadow: 0 0 0 #00823b;
  }

  // Disabled button styles
  &.disabled,
  &[disabled='disabled'],
  &[disabled] {
    opacity: 0.5;
    &:hover {
      cursor: default;
      background-color: #00823b;
    }

    &:active {
      top: 0;
      box-shadow: 0 2px 0 #00692f;
      /* removed IE8-specific rule */
    }
  }

  /* removed rules to set text colour depending on background colour */

  // making the click target bigger than the button
  // (and fill the space made when the button moves)
  &:before {
    content: '';
    height: 110%;
    width: 100%;
    display: block;
    background: transparent;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:active:before {
    top: -10%;
    height: 120%;

    /* removed IE6-specific rule */
  }

  /* removed IE8-specific rule */
`

const button = css`
  ${govuk_button};

  font-family: ${theme.weight.b}, Helvetica, Arial, sans-serif;
  font-size: ${theme.font.lg};
  font-weight: 600;
  line-height: 2;
  text-align: center;

  color: ${theme.colour.white};
  background-color: ${theme.colour.green};
  overflow: hidden;

  // Size and shape
  padding: ${theme.spacing.sm} ${theme.spacing.lg};

  ${mediaQuery.sm(css`
    width: 100%;
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
  `)};

  &:visited {
    background-color: ${theme.colour.green};
  }

  &:focus {
    outline: 4px solid ${theme.colour.focus};
    outline-offset: -1px;
  }

  &:hover,
  &:focus {
    background-color: ${theme.colour.greenDark};
    box-shadow: 0 2px 0 ${incrementColor(theme.colour.black, 20)};
  }

  &:active {
    top: 2px;
    background-color: ${theme.colour.greenDark};
    box-shadow: 0 0 0 ${theme.colour.greenDark};
  }

  &:disabled {
    &:hover {
      cursor: not-allowed;
      background-color: ${incrementColor(theme.colour.greenDark, 50)};
    }
  }
`

const Button = ({ children, ...props }) => (
  <button className={button} {...props}>
    {children}
  </button>
)
Button.propTypes = {
  children: PropTypes.any.isRequired,
}

export { Button as default, button as buttonStyles }
