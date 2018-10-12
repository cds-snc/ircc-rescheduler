import React from 'react'
import { css } from 'react-emotion'
import PropTypes from 'prop-types'
import { theme, mediaQuery } from '../styles'
import { Trans } from '@lingui/react'

const badge = css`
  border-radius: 5px;
  height: 1.3rem;
  font-size: ${theme.font.xs};
  color: ${theme.colour.white};
  font-weight: 700;
`

const beta = css`
  ${badge};
  background-color: #006de4;
  height: 1.3rem;
  padding: 0.2rem 0.55rem;

  ${mediaQuery.sm(css`
    padding: 0.2rem 0.7rem;
  `)};

  ${mediaQuery.xs(css`
    padding: 0.2rem 0.48rem;
  `)};
`

const alpha = css`
  ${badge};
  background-color: #e8026e;
  padding: ${theme.spacing.xxs} ${theme.spacing.xs};
`

const message = css`
  font-size: ${theme.font.xs};
  margin-left: ${theme.spacing.md};
  color: ${theme.colour.white};

  a,
  a:visited {
    color: ${theme.colour.white};
  }
`

const container = css`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colour.white};
  ${mediaQuery.sm(css`
    margin-bottom: ${theme.spacing.md};
  `)};
`

const phaseCheck = (props, propName, componentName) => {
  if (!props.phase) {
    return new Error(
      `Please specify whether your project is in 'alpha' or 'beta' i.e: <PhaseBanner phase="alpha">message</PhaseBanner> `,
    )
  }

  if (!['alpha', 'beta'].includes(props.phase)) {
    return new Error(`Invalid phase '${props.phase}', try 'alpha' or 'beta'`)
  }
}

class PhaseBanner extends React.Component {
  render() {
    return (
      <div>
        {this.props.phase === 'beta' ? (
          <div className={container}>
            <span className={beta}>
              <Trans>BETA</Trans>
            </span>
            <span className={message}>{this.props.children}</span>
          </div>
        ) : this.props.phase === 'alpha' ? (
          <div className={container}>
            <span className={alpha}>
              <Trans>ALPHA</Trans>
            </span>
            <span className={message} style={{ color: this.props.color }}>
              {this.props.children}
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

PhaseBanner.propTypes = {
  children: PropTypes.any.isRequired,
  phase: phaseCheck,
  color: PropTypes.string,
}

export default PhaseBanner
