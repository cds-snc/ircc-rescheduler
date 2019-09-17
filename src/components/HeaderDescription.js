/* eslint-disable react/display-name */
import React from 'react'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { css } from 'emotion'
import { theme } from '../styles'

const govuk_label = css`
  margin-bottom: 0.8rem;
  display: block;
  font-size: ${theme.font.lg};
  margin-left: 4.17rem;
`

class HeaderDescription extends React.Component {
  pageHeaderTitle(pathName) {
    let pathTitle = ''
    switch (pathName) {
      case '/':
        pathTitle =
          'Request an appointment for fingerprints and photo (biometrics)'
        break
      case '/register':
        pathTitle = 'Step 1 of 4 – Enter your information'
        break
      case '/selectProvince':
        pathTitle = 'Step 2 of 4 – Select a location'
        break
      case '/calendar':
        pathTitle = 'Step 3 of 4 – Select a day and time'
        break
      case '/review':
        pathTitle = 'Step 4 of 4 – Review your request'
        break
      case '/confirmation':
        pathTitle = 'Thank you! Your request has been received.'
        break
      case '/cancel':
        pathTitle = 'Cancel an appointment'
        break
      default:
      // code block
    }
    return pathTitle
  }

  render() {
    const pathTitle = this.pageHeaderTitle(this.props.pathName)
    // eslint-disable-next-line no-console
    console.log(this.props.pathName.toString())
    return (
      <div>
        <div className={govuk_label}>
          <h1>{pathTitle}</h1>
        </div>
      </div>
    )
  }
}

HeaderDescription.propTypes = {
  ...contextPropTypes,
}

export default withContext(HeaderDescription)
