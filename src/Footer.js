import React from 'react'
import PropTypes from 'prop-types'
import { WordMark } from '@cdssnc/gcui'
import styled, { css } from 'react-emotion'
import { theme, mediaQuery } from './styles'

const Circle = styled.span`
  font-size: 0.5em;
  padding-left: ${theme.spacing.lg};
  padding-right: ${theme.spacing.lg};
  position: relative;
  bottom: 2px;

  ${mediaQuery.small(css`
    font-size: 0.4em;
  `)};

  ${mediaQuery.xs(css`
    font-size: 0.1em;
  `)};
`

const footer = css`
  background-color: ${theme.colour.white};
  padding: ${theme.spacing.xl} ${theme.spacing.xxxl};
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  position: relative;

  ${mediaQuery.small(css`
    font-size: ${theme.font.md};
    display: flex;
    flex-direction: column;
    align-items: center;
  `)};

  ${mediaQuery.xs(css`
    font-size: ${theme.font.sm};
    display: flex;
    flex-direction: column;
    align-items: center;
  `)};
`

const Link = styled.a`
  color: ${theme.colour.black};
  margin-top: ${theme.spacing.lg};
  font-size: ${theme.font.sm};
`

const bottomLinks = css`
  ${mediaQuery.small(css`
    padding-top: ${theme.spacing.lg};
  `)};
`

const TopBar = styled.hr(
  {
    height: '0.4em',
    border: 'none',
    marginTop: 0,
  },
  props => ({ background: props.background }),
)

const Footer = ({ topBarBackground }) => (
  <section>
    {topBarBackground ? <TopBar background={topBarBackground} /> : ''}
    <footer className={footer}>
      <WordMark
        width="8.375em"
        height="2em"
        flag={theme.colour.black}
        text={theme.colour.black}
      />

      <div className={bottomLinks}>
        <Link href="https://www.canada.ca/en/transparency/privacy.html">
          Privacy
        </Link>

        <Circle> &#9679; </Circle>

        <Link href="#">Terms and Conditions</Link>

        <Circle> &#9679; </Circle>

        <Link href="#">Contact</Link>
      </div>
    </footer>
  </section>
)
Footer.propTypes = {
  topBarBackground: PropTypes.string,
}

export default Footer
