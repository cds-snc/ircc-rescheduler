import React from 'react'
import PropTypes from 'prop-types'
import { WordMark } from '@cdssnc/gcui'
import styled, { css } from 'react-emotion'
import { theme } from './styles'

const footer = css`
  background-color: ${theme.colour.white};
  padding: ${theme.spacing.xl} ${theme.spacing.xxxl};
  display: flex;
  justify-content: space-between;
  position: relative;
`

const Link = styled.a`
  color: ${theme.colour.black};
  margin-top: ${theme.spacing.lg};
  font-size: ${theme.font.sm};
`

const TopBar = styled.div(
  {
    height: '0.4em',
    border: 'none',
  },
  props => ({ background: props.background }),
)

const Footer = ({ topBarBackground }) => (
  <section>
    {topBarBackground ? <TopBar background={topBarBackground} /> : ''}
    <footer className={footer}>
      <Link href="https://www.canada.ca/en/transparency/privacy.html">
        Privacy
      </Link>
      <WordMark
        width="8.375em"
        height="2em"
        flag={theme.colour.black}
        text={theme.colour.black}
      />
    </footer>
  </section>
)
Footer.propTypes = {
  topBarBackground: PropTypes.string,
}

export default Footer
