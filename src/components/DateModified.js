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

    
    
    render(){

        return<div className={container}>
            Date modified: {this.date}
        </div>
        
    }
    date = document.lastModified

}


export default DateModified