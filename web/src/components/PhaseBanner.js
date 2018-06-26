import React from 'react'
import { css } from 'react-emotion'
import PropTypes from 'prop-types'
import { theme, mediaQuery } from '../styles'
import { Trans } from 'lingui-react'

const beta = css`
  background-color: #22a7f0;
  border-radius: 5px;
  height: 1.3rem;
  padding: ${theme.spacing.xxs} ${theme.spacing.sm};
  font-size: ${theme.font.xs};
  color: ${theme.colour.white};
`

const alpha = css`
  background-color: #e8026e;
  border-radius: 5px;
  padding: ${theme.spacing.xxs} ${theme.spacing.xs};
  font-size: ${theme.font.xs};
  color: ${theme.colour.white};
`

const message = css`
  font-size: ${theme.font.xs};
  margin-left: ${theme.spacing.md};
  font-weight: 400;
`

const container = css`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.xs};
  ${mediaQuery.sm(css`
    margin-bottom: ${theme.spacing.md};
  `)};
`

class PhaseBanner extends React.Component {
  render() {
    return (
      <div>
        {this.props.phase === 'beta' ? (
          <div className={container}>
            <span className={beta}>
              <Trans>BETA</Trans>
            </span>
            <span className={message} style={{ color: this.props.color }}>
              {this.props.children}
            </span>
          </div>
        ) : (
          <div className={container}>
            <span className={alpha}>
              <Trans>ALPHA</Trans>
            </span>
            <span className={message} style={{ color: this.props.color }}>
              {this.props.children}
            </span>
          </div>
        )}
      </div>
    )
  }
}

PhaseBanner.propTypes = {
  children: PropTypes.any.isRequired,
  phase: PropTypes.string,
  color: PropTypes.string,
}

export default PhaseBanner
