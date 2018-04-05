import React from 'react'
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

const topBar = css`
  background: black;
  height: 0.4em;
`

const Footer = () => (
  <section>
    <div className={topBar} />
    <footer className={footer}>
      <Link href="https://www.canada.ca/en/transparency/privacy.html">
        Privacy
      </Link>
      <WordMark
        width="134px"
        height="32px"
        flag={theme.colour.black}
        text={theme.colour.black}
      />
    </footer>
  </section>
)

export default Footer
