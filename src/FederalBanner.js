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
  ${mediaQuery.medium(css`
    display: block;
  `)};
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
`

const FederalBanner = () => (
  <section className={container}>
    <Query query={GET_LANGUAGE_QUERY}>
      {({ data: { language } }) => (
        <GoCSignature
          width="250px"
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
