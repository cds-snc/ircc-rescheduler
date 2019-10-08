import React from 'react'
import { css } from 'emotion'
import { theme, mediaQuery } from '../styles'

const container = css`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.xs};
  ${mediaQuery.sm(css`
    margin-bottom: ${theme.spacing.md};
  `)};
`

class DateModified extends React.Component {
  constructor(props) {
    super(props)
    this.lastBuildDate = process.env.RAZZLE_BUILD_DATE || 'undefined'
  }

  render() {
    return <div className={container}>Date modified: {this.lastBuildDate}</div>
  }
}

export default DateModified
