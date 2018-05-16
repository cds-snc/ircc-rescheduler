import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { theme, mediaQuery } from '../styles'

const banner = css`
  background-color: ${theme.colour.blue};
  color: ${theme.colour.white};
  padding: ${theme.spacing.lg} ${theme.spacing.xxxl};

  ${mediaQuery.small(css`
    padding-left: ${theme.spacing.xl};
    padding-right: ${theme.spacing.xl};
  `)};

  > * {
    font-size: ${theme.font.xxl};
    font-weight: 700;
  }
`

const PageHeader = ({ children }) => (
  <header className={banner}>{children}</header>
)
PageHeader.propTypes = {
  children: PropTypes.any.isRequired,
}

export default PageHeader
