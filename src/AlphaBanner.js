import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { theme, roundedEdges, mediaQuery } from './styles'

const banner = css`
  background-color: ${theme.colour.black};
  color: ${theme.colour.white};
  padding-left: ${theme.spacing.xxxl};
  padding-right: ${theme.spacing.xxxl};
  padding-top: 12px;
  padding-bottom: ${theme.spacing.sm};
`

const alpha = css`
  font-size: ${theme.font.xs};
  margin-bottom: 0;
`

const statusBar = css`
  text-transform: uppercase;
  line-height: 2;
  color: ${theme.colour.black};
  position: relative;
  display: inline-block;
  font-size: ${theme.font.xs};
  bottom: 2px;
  padding: 2px ${theme.spacing.md};
  margin-right: ${theme.spacing.md};
  background-color: ${theme.colour.white};
  ${roundedEdges};
  ${mediaQuery.small(css`
    font-size: 10px;
  `)};
`

const AlphaBanner = ({ children }) => (
  <div className={banner}>
    <p className={alpha}>
      <span className={statusBar}>Alpha</span>
      {children}
    </p>
  </div>
)
AlphaBanner.propTypes = {
  children: PropTypes.any.isRequired,
}

export default AlphaBanner
