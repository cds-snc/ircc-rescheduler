import React from 'react'
import { GoCSignature } from '@cdssnc/gcui'
import { css } from 'emotion'
import { theme, mediaQuery } from '../styles'
import LanguageSwitcher from './LanguageSwitcher'
import Language from './Language'

const container = css`
  padding: ${theme.spacing.lg} ${theme.spacing.xxxl} ${theme.spacing.md}
    ${theme.spacing.xxxl};
  width: auto;
  justify-content: space-between;
  background-color: ${theme.colour.black};
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
    <div className="svg-container canada-flag">
      <Language
        render={language => (
          <GoCSignature
            width="250px"
            lang={language}
            flag={theme.colour.white}
            text={theme.colour.white}
            focusable="false"
          />
        )}
      />
    </div>
    <LanguageSwitcher />
  </div>
)

export default FederalBanner
