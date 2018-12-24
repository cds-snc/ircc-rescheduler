import React from 'react'
import Flag from './gocSignature/Flag'
import English from './gocSignature/English'
import French from './gocSignature/French'
import { css } from 'emotion'
import { theme, horizontalPadding, mediaQuery } from '../styles'
import LanguageSwitcher from './LanguageSwitcher'
import Language from './Language'

const container = css`
  ${horizontalPadding};
  padding-top: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.md};
  width: auto;
  justify-content: space-between;
  background-color: ${theme.colour.black};
  display: -webkit-flex;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -moz-box;

  ${mediaQuery.sm(css`
    padding-top: ${theme.spacing.md};
  `)};
`

const gocContainer = css`
  display: flex;
  align-items: center;
  svg {
    margin-right: ${theme.spacing.md};
  }
`

const FederalBanner = () => (
  <div className={container}>
    <div className="svg-container canada-flag">
      <Language
        render={language => (
          <React.Fragment>
            {language === 'en' ? (
              <div className={gocContainer}>
                <Flag />
                <English />
                <French />
              </div>
            ) : (
              <div className={gocContainer}>
                <Flag />
                <French />
                <English />
              </div>
            )}
          </React.Fragment>
        )}
      />
    </div>
    <LanguageSwitcher />
  </div>
)

export default FederalBanner
