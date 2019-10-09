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
    const lastDateModifiedString =
      typeof window === 'undefined' ? '' : document.lastModified
    this.lastDateModified = new Date(lastDateModifiedString)
  }
  

  formatDate(date) {
    let year, month, day
    year = date.getFullYear()
    month = date
      .getMonth()
      .toString()
      .padStart(2, '0')
    day = date
      .getDate()
      .toString()
      .padStart(2, '0')


    return `${year}-${month}-${day}`
  }

  render() {
    return (
      <div className={container}>
        Date modified: {this.formatDate(this.lastDateModified)}
      </div>
    )
  }
}



export default DateModified