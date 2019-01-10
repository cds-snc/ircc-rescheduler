import React from 'react'
import English from '../assets/FIPEnglish.svg'
import French from '../assets/FIPFrench.svg'
import Flag from '../assets/FIPFlag.svg'
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
  background-color: ${theme.colour.black};
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
  height: 1.21rem;
  margin-right: 1rem;
`

const flagSVG = css`
  ${baseSVG};
  width: 47px;
  ${mediaQuery.sm(css`
    width: 40px;
  `)};
`

const engSVG = css`
  ${baseSVG};
  width: 71px;
  ${mediaQuery.sm(css`
    width: 62.5px;
  `)};
`

const frSVG = css`
  ${baseSVG};
  width: 83.5px;
  ${mediaQuery.sm(css`
    width: 74.5px;
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
                <img src={Flag} alt="" className={flagSVG} />
                <img src={English} alt="" className={engSVG} />
                <img src={French} alt="" className={frSVG} />
              </div>
            ) : (
              <div className={gocContainer}>
                <img src={Flag} alt="" className={flagSVG} />
                <img src={French} alt="" className={frSVG} />
                <img src={English} alt="" className={engSVG} />
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
