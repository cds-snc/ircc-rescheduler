import React from 'react'
import English from '../assets/sig-blk-en.svg'
import French from '../assets/sig-blk-fr.svg'
import { css } from 'emotion'
import { theme, horizontalPadding, mediaQuery } from '../styles'
import LanguageSwitcher from './LanguageSwitcher'
import Language from './Language'

const container = css`
  ${horizontalPadding};
  padding-top: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.lg};
  width: auto;
  justify-content: space-between;
  background-color: ${theme.colour.white};
  display: -webkit-flex;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -moz-box;

  ${mediaQuery.sm(css`
    padding-top: ${theme.spacing.md};
    padding-bottom: ${theme.spacing.md};
  `)};
`

const gocContainer = css`
  display: flex;
  align-items: flex-start;
  svg {
    margin-right: ${theme.spacing.md};
  }
`

const baseSVG = css`
  height: 2rem;
  margsin-right: 1rem;
`

const engSVG = css`
  ${baseSVG};
  width: 400px;
  ${mediaQuery.sm(css`
    width: 200.5px;
  `)};
`

const frSVG = css`
  ${baseSVG};
  width: 500px;
  ${mediaQuery.sm(css`
    width: 200.5px;
  `)};
`

const FederalBanner = () => (
  <div className={container}>
    <div className="svg-container canada-flag">
      <Language
        render={language => (
          <React.Fragment>
            {language === 'en' ? (
              <div
                className={gocContainer}
                aria-label={
                  language === 'en'
                    ? 'Government of Canada'
                    : 'Gouvernement du Canada'
                }
              >
                <a href="https://www.canada.ca/en.html">
                  <img
                    src={English}
                    alt="Government of Canada"
                    className={engSVG}
                  />
                </a>
              </div>
            ) : (
              <div className={gocContainer}>
                <a href="https://www.canada.ca/fr.html">
                  <img
                    src={French}
                    alt="Gouvernement du Canada"
                    className={frSVG}
                  />
                </a>
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
