import React from 'react'
import { css } from 'emotion'
import { theme, horizontalPadding, mediaQuery } from '../styles'
import { Trans } from '@lingui/react'

const container = css`
  html:not(.development):not(.staging) & {
    display: none;
  }

  ${horizontalPadding};
  padding-top: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.lg};
  background-color: ${theme.colour.focus};

  ${mediaQuery.sm(css`
    padding-top: ${theme.spacing.md};
    padding-bottom: ${theme.spacing.md};
  `)};
`

const header = css`
  :focus {
    outline: 3px solid ${theme.colour.white};
    outline-offset: ${theme.spacing.xs};
  }
`

const FlashBanner = () => (
  <div className={container}>
    <h2 role="alert" tabIndex="0" className={header}>
      <Trans>
        Warning! This is a prototype that won’t submit your request. Do not use
        this page.
      </Trans>
    </h2>
  </div>
)

export default FlashBanner
