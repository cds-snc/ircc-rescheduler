import React from 'react'
import { GoCSignature } from '@cdssnc/gcui'
import { Query } from 'react-apollo'
import { GET_LANGUAGE_QUERY } from './queries'
import { css } from 'react-emotion'
import { theme, mediaQuery } from './styles'
import { LanguageSwitcher } from './LanguageSwitcher'

const container = css`
  padding: ${theme.spacing.lg} ${theme.spacing.xxxl} ${theme.spacing.md}
    ${theme.spacing.xxxl};
  display: flex;
  height: 1.5em;
  width: auto;
  justify-content: space-between;
  background-color: ${theme.colour.white};
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  ${mediaQuery.small(css`
    padding-left: ${theme.spacing.xl};
    padding-right: ${theme.spacing.xl};
  `)};
  ${mediaQuery.small(css`
    height: 1.4em;
  `)};
  ${mediaQuery.xs(css`
    height: 3em;
    flex-direction: column;
  `)};
`

const FederalBanner = () => (
  <section className={container}>
    <Query query={GET_LANGUAGE_QUERY}>
      {({ data: { language } }) => (
        <GoCSignature
          width="13rem"
          lang={language}
          flag={theme.colour.black}
          text={theme.colour.black}
        />
      )}
    </Query>
    <LanguageSwitcher />
  </section>
)

export default FederalBanner
