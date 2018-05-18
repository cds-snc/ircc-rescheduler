import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { theme, roundedEdges, mediaQuery } from '../styles'

const banner = css`
  background-color: ${theme.colour.black};
  color: ${theme.colour.white};
  padding-left: ${theme.spacing.xxxl};
  padding-right: ${theme.spacing.xxxl};
  padding-top: 12px;
  padding-bottom: ${theme.spacing.sm};
  font-size: ${theme.font.xs};

  ${mediaQuery.sm(css`
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
  color: ${theme.colour.white};
  background-color: ${theme.colour.alpha};
  padding: 2px ${theme.spacing.md};
  margin-right: ${theme.spacing.md};
  ${roundedEdges};
  ${horizontalAlign};
  ${mediaQuery.sm(css`
    padding: 2px ${theme.spacing.md};
    margin-bottom: ${theme.spacing.xs};
  `)};
`

const message = css`
  ${horizontalAlign};
  font-weight: 600;

  ${mediaQuery.sm(css`
    display: block;
    bottom: 0;
    font-weight: 400;
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
