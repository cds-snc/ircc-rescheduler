import styled, { css } from 'react-emotion'
import { theme, roundedEdges, mediaQuery, incrementColor } from '../styles'

const govuk_button = css`
  /* https://raw.githubusercontent.com/alphagov/govuk_frontend_toolkit/e00b009b2a9722363d3c247838632d8e3673daa9/stylesheets/design-patterns/_buttons.scss */
  /* since I don't have their sass variables, I'm using a close-enough default colour */
  background-color: forestgreen;

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
  box-shadow: 0 2px 0 lightseagreen;
  /* removed IE8-specific rule */

  // Text
  font-size: 1em; // inherit from parent
  line-height: 1.25;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;

  // Interaction
  cursor: pointer;

  &:visited {
    background-color: forestgreen;
  }

  &:hover,
  &:focus {
    background-color: darkgreen;
  }

  &:active {
    top: 2px;
    box-shadow: 0 0 0 forestgreen;
  }

  // Disabled button styles
  &.disabled,
  &[disabled='disabled'],
  &[disabled] {
    opacity: 0.5;
    &:hover {
      cursor: default;
      background-color: forestgreen;
    }

    &:active {
      top: 0;
      box-shadow: 0 2px 0 darkgreen;
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

const Button = styled.button`
  ${govuk_button};

  font-family: -apple-system, system-ui, Helvetica, Arial, sans-serif;
  font-size: ${theme.font.lg};
  font-weight: 600;
  line-height: 2;

  color: ${theme.colour.white};
  background-color: ${theme.colour.green};

  // Size and shape
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  ${roundedEdges};

  // Bottom edge effect
  box-shadow: 0 2px 0 ${incrementColor(theme.colour.grey, 80)};

  ${mediaQuery.small(css`
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
    background-color: ${incrementColor(theme.colour.green, 20)};
    box-shadow: 0 2px 0 ${incrementColor(theme.colour.grey, 100)};
  }

  &:active {
    top: 2px;
    background-color: ${incrementColor(theme.colour.green, 20)};
    box-shadow: 0 0 0 ${incrementColor(theme.colour.green, 20)};
  }

  &:disabled {
    &:hover {
      cursor: not-allowed;
      background-color: ${incrementColor(theme.colour.green, 30)};
    }
  }
`

export default Button
