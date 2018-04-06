import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { theme } from './styles'

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
PageHeader.propTypes = {
  children: PropTypes.any.isRequired,
}

export default PageHeader
