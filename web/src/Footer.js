import React from 'react'
import PropTypes from 'prop-types'
import { WordMark } from '@cdssnc/gcui'
import styled, { css } from 'react-emotion'
import { theme, mediaQuery } from './styles'

const Circle = styled.span`
  font-size: 0.5em;
  position: relative;
  bottom: 2px;

  ${mediaQuery.medium(css`
    display: none;
  `)};
`

const footer = css`
  background-color: ${theme.colour.white};
  padding: ${theme.spacing.xl} ${theme.spacing.xxxl};
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  position: relative;
  font-size: ${theme.font.md};

  .svg-container {
    width: 150px;
    height: 40px;

    ${mediaQuery.small(css`
      width: 140px;
      height: 36px;
    `)};
  }

  ${mediaQuery.medium(css`
    flex-direction: column;
    align-items: center;
  `)};
`

const bottomLinks = css`
  margin-top: ${theme.spacing.md};
  font-size: ${theme.font.md};
  display: inline-block;

  > * {
    margin-right: ${theme.spacing.md};

    ${mediaQuery.small(css`
      margin-right: 0;
      margin-bottom: ${theme.spacing.xs};
    `)};
  }

  a {
    color: ${theme.colour.black};
  }

  ${mediaQuery.medium(css`
    display: flex;
    margin-top: ${theme.spacing.xl};
    flex-direction: row;
    align-items: center;
  `)};

  ${mediaQuery.small(css`
    margin-top: ${theme.spacing.lg};
    flex-direction: column;
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

const Footer = ({ topBarBackground }) => (
  <div>
    {topBarBackground ? <TopBar background={topBarBackground} /> : ''}
    <footer className={footer}>
      <div className="svg-container">
        <WordMark
          width="150px"
          height="40px"
          flag={theme.colour.black}
          text={theme.colour.black}
        />
      </div>

      <div className={bottomLinks}>
        <a href="https://www.canada.ca/en/transparency/privacy.html">Privacy</a>
        <Circle>&#9679;</Circle>
        <a href="mailto:cds-snc@tbs-sct.gc.ca">Contact</a>
        <Circle>&#9679;</Circle>
        <a href="https://digital.canada.ca/legal/terms/">
          Terms and Conditions
        </a>
      </div>
    </footer>
  </div>
)
Footer.propTypes = {
  topBarBackground: PropTypes.string,
}

export default Footer
