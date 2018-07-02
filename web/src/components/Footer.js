import React from 'react'
import withContext from '../withContext'
import { contextPropTypes } from '../context'
import PropTypes from 'prop-types'
import { Trans, withI18n } from 'lingui-react'
import { translateText } from '../utils/linguiUtils'
import { WordMark } from '@cdssnc/gcui'
import styled, { css } from 'react-emotion'
import { theme, mediaQuery, visuallyhiddenMobile } from '../styles'

const footer = css`
  background-color: ${theme.colour.white};
  padding: ${theme.spacing.xl} ${theme.spacing.xxxl};
  display: flex;
  justify-content: space-between;
  position: relative;
  font-size: ${theme.font.md};

  .svg-container {
    width: 150px;
    height: 40px;

    ${mediaQuery.md(css`
      width: 85px;
      height: 25px;
    `)};

    ${mediaQuery.sm(css`
      width: 65px;
      height: 18px;
    `)};
  }

  ${mediaQuery.md(css`
    align-items: center;
    padding: ${theme.spacing.xl} ${theme.spacing.xxxl};
  `)};

  ${mediaQuery.sm(css`
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
  `)};
`

const bottomLinks = css`
  margin-top: ${theme.spacing.md};
  font-size: ${theme.font.md};
  display: inline-block;

  > * {
    margin-right: ${theme.spacing.xl};

    ${mediaQuery.md(css`
      margin-right: 0;
      margin-left: ${theme.spacing.lg};
    `)};

    ${mediaQuery.sm(css`
      margin-bottom: ${theme.spacing.xs};
    `)};
  }

  a {
    color: ${theme.colour.black};
  }

  a:nth-of-type(2) {
    color: ${theme.colour.black};
  }

  ${mediaQuery.md(css`
    display: flex;
    margin-top: ${theme.spacing.sm};
    font-size: ${theme.font.sm};
  `)};

  ${mediaQuery.sm(css`
    margin-top: ${theme.spacing.md};
  `)};
`

const TopBar = styled.hr(
  {
    height: '0.4em',
    border: 'none',
    margin: 0,
  },
  props => ({ background: props.background }),
)

const Footer = withI18n()(({ topBarBackground, i18n, context = {} }) => (
  <div>
    {topBarBackground ? <TopBar background={topBarBackground} /> : ''}
    <footer className={footer}>
      <div className={bottomLinks}>
        <a href="mailto:cds-snc@tbs-sct.gc.ca">
          <Trans>Contact</Trans>
        </a>
        <a
          href={translateText(
            i18n,
            'https://www.canada.ca/en/transparency/privacy.html',
          )}
        >
          <Trans>Privacy</Trans>
        </a>
        <a href={translateText(i18n, 'https://digital.canada.ca/legal/terms/')}>
          <Trans>Terms</Trans>
          <span className={visuallyhiddenMobile}>
            {' '}
            <Trans>and Conditions</Trans>
          </span>
        </a>
      </div>

      <div className="svg-container">
        <WordMark
          width="150px"
          height="40px"
          lang={context.store.language}
          flag={theme.colour.redFIP}
          text={theme.colour.black}
        />
      </div>
    </footer>
  </div>
))
Footer.propTypes = {
  ...contextPropTypes,
  topBarBackground: PropTypes.string,
}

const FooterContext = withContext(Footer)

export { FooterContext as default, Footer as FooterBase }
