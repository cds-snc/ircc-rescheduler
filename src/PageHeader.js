import React from 'react'
import { css } from 'react-emotion'
import { theme, roundedEdges, mediaQuery } from './styles'

const banner = css`
  background-color: ${theme.colour.greyLight};
  color: ${theme.colour.black};
  padding: ${theme.spacing.xl} ${theme.spacing.xxxl};
`

const PageHeader = ({ children }) => (
  <section className={banner}>
    <span>{children}</span>
  </section>
)

export default PageHeader
