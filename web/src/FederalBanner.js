import React from 'react'
import { GoCSignature } from '@cdssnc/gcui'
import { Query } from 'react-apollo'
import { GET_LANGUAGE_QUERY } from './queries'
import { css } from 'react-emotion'
import { theme, mediaQuery } from './styles'
import { LanguageSwitcher } from './LanguageSwitcher'

const container = css`
  padding: ${theme.spacing.md} ${theme.spacing.xxxl} ${theme.spacing.sm}
    ${theme.spacing.xxxl};
  width: auto;
  justify-content: space-between;
  background-color: ${theme.colour.white};
  display: -webkit-flex;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -moz-box;
  display: flex;

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
    margin-top: -${theme.spacing.xs};

    ${mediaQuery.xs(css`
      margin-top: 0;
      /* this means the "Français" link looks aligned with the flag */
      margin-left: -2px;
    `)};
  }
`

const FederalBanner = () => (
  <section className={container}>
    <Query query={GET_LANGUAGE_QUERY}>
      {({ data: { language } }) => (
        <div>
          <GoCSignature
            width="13rem"
            lang={language}
            flag={theme.colour.black}
            text={theme.colour.black}
          />
        </div>
      )}
    </Query>
    <LanguageSwitcher />
  </section>
)

export default FederalBanner
