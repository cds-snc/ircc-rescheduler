import React from 'react'
import { WordMark } from '@cdssnc/gcui'
import styled, { css } from 'react-emotion'
import { theme } from './styles'

const footer = css`
  background-color: ${theme.colour.black};
  padding: ${theme.spacing.xl}px ${theme.spacing.xxxl}px;
  display: flex;
  justify-content: space-between;
  position: relative;
`

const Link = styled.a`
  color: ${theme.colour.white};
  margin-top: ${theme.spacing.lg}px;
  font-size: ${theme.font.sm};
`

const Footer = () => (
  <footer className={footer}>
    <Link href="https://www.canada.ca/en/transparency/privacy.html">
      Privacy
    </Link>
    <WordMark
      width="134px"
      height="32px"
      flag={theme.colour.white}
      text={theme.colour.white}
    />
  </footer>
)

export default Footer
