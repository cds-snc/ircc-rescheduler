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
  font-size: ${theme.font.xs};

  ${mediaQuery.small(css`
    font-family: ${theme.weight.r};
    padding-left: ${theme.spacing.xl};
    padding-right: ${theme.spacing.xl};
    font-size: ${theme.font.xs};
  `)};
`

const horizontalAlign = css`
  position: relative;
  display: inline-block;
  bottom: 2px;
`

const badge = css`
  text-transform: uppercase;
  line-height: 1.8;
  color: ${theme.colour.black};
  padding: 2px ${theme.spacing.md};
  margin-right: ${theme.spacing.md};
  background-color: ${theme.colour.white};
  ${roundedEdges};
  ${horizontalAlign};
  ${mediaQuery.small(css`
    padding: 2px ${theme.spacing.md};
    margin-bottom: ${theme.spacing.xs};
  `)};
`

const message = css`
  ${horizontalAlign};

  ${mediaQuery.small(css`
    display: block;
    bottom: 0;
  `)};
`

const AlphaBanner = ({ children }) => (
  <div className={banner}>
    <div className={`alphaBanner--badge ${badge}`}>Alpha</div>
    <div className={`alphaBanner--message ${message}`}>{children}</div>
  </div>
)
AlphaBanner.propTypes = {
  children: PropTypes.any.isRequired,
}

export default AlphaBanner
