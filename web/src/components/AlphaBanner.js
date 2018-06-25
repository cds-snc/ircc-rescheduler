import React from 'react'
import styled, { css } from 'react-emotion'
import { theme, mediaQuery } from '../styles'
import { PhaseBanner } from '@cdssnc/gcui'

const beta = css`
  background-color: #22a7f0;
`

const alpha = css`
  background-color: red;
`

class AlphaBanner extends React.Component {
  render() {
    return (
      <div>
        {this.props.phase === 'beta' ? (
          <div>
            <span className={beta}>BETA</span>
            <span>{this.props.children}</span>
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
