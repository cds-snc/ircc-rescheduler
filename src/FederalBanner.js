import React from 'react'
import { GoCSignature } from '@cdssnc/gcui'
import { css } from 'react-emotion'
import { theme, mediaQuery } from './styles'

const container = css`
  padding: ${theme.spacing.lg} ${theme.spacing.xxxl} ${theme.spacing.md}
    ${theme.spacing.xxxl};
  display: flex;
  width: auto;
  justify-content: space-between;
  background-color: ${theme.colour.white};
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
        flag={theme.colour.black}
        text={theme.colour.black}
      />
    </div>
  </section>
)

export default FederalBanner
