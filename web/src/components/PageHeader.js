import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { theme, mediaQuery } from '../styles'

const banner = css`
  background-color: ${theme.colour.blue};
  color: ${theme.colour.white};
  padding: ${theme.spacing.lg} ${theme.spacing.xxxl};

  ${mediaQuery.sm(css`
    padding-left: ${theme.spacing.xl};
    padding-right: ${theme.spacing.xl};
  `)};

  > * {
    font-size: ${theme.font.xxl};
    font-weight: 700;

    ${mediaQuery.sm(css`
      font-size: ${theme.font.lg};
    `)};
  }
`

const PageHeader = ({ children, headerClass = '' }) => (
  <header className={`${banner} ${headerClass}`}>{children}</header>
)
PageHeader.propTypes = {
  children: PropTypes.any.isRequired,
  headerClass: PropTypes.string,
}

export default PageHeader
