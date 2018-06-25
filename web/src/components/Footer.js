import React from 'react'
import PropTypes from 'prop-types'
import { WordMark } from '@cdssnc/gcui'
import styled, { css } from 'react-emotion'
import { Trans, withI18n } from 'lingui-react'
import { theme, mediaQuery, visuallyhiddenMobile } from '../styles'

const Circle = styled.span`
  font-size: 0.5em;
  position: relative;
  bottom: 2px;

  ${mediaQuery.md(css`
    display: none;
  `)};
`

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
    margin-right: ${theme.spacing.md};

    ${mediaQuery.md(css`
      margin-right: 0;
      margin-left: ${theme.spacing.md};
    `)};

    ${mediaQuery.sm(css`
      margin-bottom: ${theme.spacing.xs};
    `)};
  }

  a {
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

/*
  Helper method that checks to see if the i18n object is null or not, since it ends up being null 
  if the user refreshes the page. Returns normal english (i18n.t doesnt work and returns english) otherwise.
  The reason we have to sometimes use this method over say the <Trans> tag is that we need the text to be a string at compile time (it's a React object at compile time)
  */
const translateText = (i18n, text) => {
  const translation = i18n === undefined ? text : i18n._(text)
  return translation
}

const Footer = ({ topBarBackground, i18n }) => (
  <div>
    {topBarBackground ? <TopBar background={topBarBackground} /> : ''}
    <footer className={footer}>
      <div className="svg-container">
        <WordMark
          width="150px"
          height="40px"
          flag={theme.colour.redFIP}
          text={theme.colour.black}
        />
      </div>

      <div className={bottomLinks}>
        <a href="mailto:cds-snc@tbs-sct.gc.ca">
          <Trans>Contact</Trans>
        </a>
        <Circle>&#9679;</Circle>
        <a
          href={translateText(
            i18n,
            'https://www.canada.ca/en/transparency/privacy.html',
          )}
        >
          <Trans>Privacy</Trans>
        </a>
        <Circle>&#9679;</Circle>
        <a href={translateText(i18n, 'https://digital.canada.ca/legal/terms/')}>
          <Trans>Terms</Trans>
          <span className={visuallyhiddenMobile}>
            {' '}
            <Trans>and Conditions</Trans>
          </span>
        </a>
      </div>
    </footer>
  </div>
)
Footer.propTypes = {
  i18n: PropTypes.object,
  topBarBackground: PropTypes.string,
}

export default withI18n()(Footer)
