import React from 'react'
import { GoCSignature } from '@cdssnc/gcui'
import { Query } from 'react-apollo'
import { GET_LANGUAGE_QUERY } from '../queries'
import { css } from 'react-emotion'
import { theme, mediaQuery } from '../styles'
import { LanguageSwitcher } from './LanguageSwitcher'

const container = css`
  padding: ${theme.spacing.lg} ${theme.spacing.xxxl} ${theme.spacing.md}
    ${theme.spacing.xxxl};
  width: auto;
  justify-content: space-between;
  background-color: ${theme.colour.white};
  display: -webkit-flex;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -moz-box;
  display: flex;

  .svg-container {
    /* same as the width value in our svg */
    width: 250px;
    height: 30px;
  }

  ${mediaQuery.sm(css`
    padding: ${theme.spacing.md} ${theme.spacing.xl} ${theme.spacing.md}
      ${theme.spacing.xl};
  `)};

  ${mediaQuery.xs(css`
    .svg-container {
      width: 210px;
      height: 20px;

      svg {
        width: 210px;
        height: 20px;
      }
    }
  `)};
`

const FederalBanner = () => (
  <div className={container}>
    <Query query={GET_LANGUAGE_QUERY}>
      {({ data: { language } }) => (
        <div className="svg-container">
          <GoCSignature
            width="250px"
            lang={language}
            flag={theme.colour.redFIP}
            text={theme.colour.black}
          />
        </div>
      )}
    </Query>
    <LanguageSwitcher />
  </div>
)

export default FederalBanner
