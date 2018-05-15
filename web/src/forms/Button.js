import styled, { css } from 'react-emotion'
import { theme, roundedEdges, mediaQuery, incrementColor } from '../styles'

const Button = styled.button`
  font-size: ${theme.font.lg};
  font-weight: 500;
  line-height: 2;

  color: ${theme.colour.white};
  background-color: ${theme.colour.green};
  border: none;
  cursor: pointer;

  // Size and shape
  position: relative;
  display: inline-block;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  ${roundedEdges};

  outline: 1px solid transparent; // keep some button appearance when changing colour settings in browsers
  outline-offset: -1px; // fixes bug in Safari that outline width on focus is not overwritten, is reset to 0 on focus in govuk_template
  -webkit-appearance: none;

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

  &:active,
  &:disabled {
    filter: alpha(opacity=60);
    opacity: 0.6;
  }

  &:disabled {
    &:hover {
      cursor: not-allowed;
      background-color: ${incrementColor(theme.colour.green, 30)};
    }
  }

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

  &:hover:before,
  &:active:before {
    top: -10%;
    height: 120%;
  }
`

export default Button
