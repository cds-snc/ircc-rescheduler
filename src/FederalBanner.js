import React from 'react'
import { GoCSignature } from '@cdssnc/gcui'
import { css } from 'react-emotion'
import { theme, mediaQuery } from './styles'

const container = css`
  padding: ${theme.spacing.lg}px ${theme.spacing.xxxl}px ${theme.spacing.md}px
    ${theme.spacing.xxxl}px;
  display: flex;
  width: auto;
  justify-content: space-between;
  background-color: ${theme.colour.black};
  ${mediaQuery.medium(css`
    display: block;
  `)};
`

const FederalBanner = () => (
  <section className={container}>
    <div>
      <GoCSignature
        width="250px"
        height="24px"
        flag={theme.colour.white}
        text={theme.colour.white}
      />
    </div>
  </section>
)

export default FederalBanner
