import React from 'react'
import { css } from 'emotion'
import { theme, mediaQuery } from '../../styles'
import { Trans } from '@lingui/react'
import { Link } from 'react-router-dom'
import { GoArrowLeft } from 'react-icons/go'

const goArrowLeft = css`
  font-size: 24px;
  vertical-align: middle;
  right: 9px;
  height: 1.3rem;
  width: 1.3rem;
  bottom: 0.058em;
  position: relative;
`

const govuk_button = css`
  /* https://raw.githubusercontent.com/alphagov/govuk_frontend_toolkit/e00b009b2a9722363d3c247838632d8e3673daa9/stylesheets/design-patterns/_buttons.scss */
  background-color: #00823b;

  position: relative;
  display: inline-block;
  padding: 10px 15px 5px;
  border: none;
  border-radius: 5px;
  outline: 1px solid transparent; // keep some button appearance when changing colour settings in browsers
  outline-offset: -1px; // fixes bug in Safari that outline width on focus is not overwritten, is reset to 0 on focus in govuk_template
  -webkit-appearance: none;

  // Bottom edge effect
  /* again, I don't have sass variables, so I'm using default colour */
  // box-shadow: 0 2px 0 #003618;
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

  font-family: SourceSans, Helvetica, Arial, sans-serif;
  font-size: ${theme.font.lg};
  font-weight: 500;
  border-width: 0px;
  line-height: 2;
  text-align: center;

  background: inherit;
  background-color: rgba(234, 235, 237, 1);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(220, 222, 225, 1);
  border-radius: 5px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;

  color: ${theme.colour.black} !important;
  background-color: rgba(234, 235, 237, 1);
  overflow: hidden;

  // Size and shape
  padding: ${theme.spacing.xs} ${theme.spacing.lg};

  ${mediaQuery.sm(css`
    width: 100%;
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
  `)};

  &:visited {
    color: ${theme.colour.black} !important;
    background-color: rgba(234, 235, 237, 1);
  }

  &:focus {
    outline: 4px solid ${theme.colour.focus};
    outline-offset: -1px;
  }

  &:hover,
  &:focus {
    background-color: rgba(207, 209, 213, 1);
  }

  &:active {
    top: 2px;
    border-color: rgba(101, 104, 110, 1);
  }

  &:disabled {
    &:hover {
      cursor: not-allowed;
      border-color: rgba(101, 104, 110, 1);
    }
  }
`

export const GoBackButtonReg = () => (
  <Link to="/">
    <button className={button}>
      <GoArrowLeft className={goArrowLeft} />
      <Trans>Previous</Trans>
    </button>
  </Link>
)

export const GoBackButtonSelPrv = () => (
  <Link to="/register">
    <button className={button}>
      <GoArrowLeft className={goArrowLeft} />
      <Trans>Previous</Trans>
    </button>
  </Link>
)

export const GoBackButtonCal = () => (
  <Link to="/selectProvince">
    <button className={button}>
      <GoArrowLeft className={goArrowLeft} />
      <Trans>Previous</Trans>
    </button>
  </Link>
)

export const GoBackButtonReview = () => (
  <Link to="/calendar">
    <button className={button}>
      <GoArrowLeft className={goArrowLeft} />
      <Trans>Previous</Trans>
    </button>
  </Link>
)

// export default (GoBackButtonReg, GoBackButtonSelPrv, GoBackButtonCal)
