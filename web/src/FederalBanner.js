import React from 'react'
import { GoCSignature } from '@cdssnc/gcui'
import { Query } from 'react-apollo'
import { GET_LANGUAGE_QUERY } from './queries'
import { css } from 'react-emotion'
import { theme, mediaQuery } from './styles'
import { LanguageSwitcher } from './LanguageSwitcher'

const container = css`
  padding: ${theme.spacing.lg} ${theme.spacing.xxxl} ${theme.spacing.lg}
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

  ${mediaQuery.small(css`
    padding-left: ${theme.spacing.xl};
    padding-right: ${theme.spacing.xl};
  `)};

  ${mediaQuery.xs(css`
    flex-direction: column;
  `)};

  /*
  This is a fudge.
  We shouldn't know that the LanguageSwitcher component is a <section>, really.
  The reason for this is that these spacing rules make sense in the
  context of the Banner segment, not on the switcher by itself.
  */
  section {
    ${mediaQuery.xs(css`
      margin-top: ${theme.spacing.sm};
      /* this means the "Français" link looks aligned with the flag */
      margin-left: -2px;
    `)};
  }
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
