import React from 'react'

import { Trans } from '@lingui/react'
import { css } from 'emotion'
import { theme, mediaQuery } from '../../styles'

const govuk_reportButton = css`
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
  font-size: 16px; // inherit from parent
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

const reportButton = css`
  ${govuk_reportButton}; !important;



  font-family: SourceSans, Helvetica, Arial, sans-serif;
  font-size: ${theme.font.lg};
  font-weight: 400;
  border-width: 0px;
  line-height: 1.8;
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
  






  box-shadow: 1px 1px #888888;
  color: ${theme.colour.blue} !important;
  background-color: rgba(234, 235, 237, 1);
  overflow: hidden;

  // Size and shape
  padding: 0.3rem 95px ;

  ${mediaQuery.sm(css`
    width: 100%;
    padding: 10px 14px;
  `)};

  &:visited {
    color: ${theme.colour.white} !important;
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
    background-color: rgba(234, 235, 237, 1);
  }

  &:disabled {
    &:hover {
      cursor: not-allowed;
      background-color: rgba(234, 235, 237, 1);
    }
  }
`
export const ReportButton = () => (
  <a className={reportButton}>
    <Trans>Report a problem on this page</Trans>
  </a>
)
