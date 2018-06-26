import React from 'react'
import styled, { css } from 'react-emotion'
import { theme, mediaQuery } from '../styles'
import { PhaseBanner } from '@cdssnc/gcui'

const beta = css`
  background-color: #22a7f0;
  border-radius: 5px;
  padding: ${theme.spacing.xxs} ${theme.spacing.xs};
  font-size: ${theme.font.xs};
  color: ${theme.colour.white};
`

const alpha = css`
  background-color: red;
`

const message = css`
  font-size: ${theme.font.xs};
  margin-left: ${theme.spacing.md};
`

class AlphaBanner extends React.Component {
  render() {
    return (
      <div>
        {this.props.phase === 'beta' ? (
          <div>
            <span className={beta}>BETA</span>
            <span className={message} style={{ color: this.props.color }}>
              {this.props.children}
            </span>
          </div>
        ) : (
          <div>
            <span className={alpha}>ALPHA</span>
            <span>{this.props.children}</span>
          </div>
        )}
      </div>
    )
  }
}

export default AlphaBanner
