import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { theme, mediaQuery } from './styles'

const banner = css`
  background-color: ${theme.colour.greyLight};
  color: ${theme.colour.black};
  padding: ${theme.spacing.xxl} ${theme.spacing.xxxl};

  ${mediaQuery.small(css`
    padding-left: ${theme.spacing.xl};
    padding-right: ${theme.spacing.xl};
  `)};
`

const PageHeader = ({ children }) => (
  <header className={banner}>{children}</header>
)
PageHeader.propTypes = {
  children: PropTypes.any.isRequired,
}

export default PageHeader
