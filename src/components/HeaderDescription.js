/* eslint-disable react/display-name */
import { Trans } from '@lingui/react'
import React from 'react'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { css } from 'emotion'
import { theme } from '../styles'

const govuk_label = css`
  margin-bottom: 0.15rem;
  font-family: 'Lato Bold', 'Lato Regular', 'Lato';
  font-size: ${theme.font.lg};
  font-weight: bold;
  font-style: normal;
  margin-left: 4.17rem;
`

class HeaderDescription extends React.Component {
  pageHeaderTitle(pathName) {
    let pathTitle = ''
    switch (pathName) {
      case '/':
        pathTitle = (
          <Trans>
            Request an appointment for fingerprints and photo (biometrics)
          </Trans>
        )
        break
      case '/register':
        pathTitle = <Trans>Step 1 of 4 – Enter your information</Trans>
        break
      case '/selectProvince':
        pathTitle = <Trans>Step 2 of 4 – Select a location</Trans>
        break
      case '/calendar':
        pathTitle = <Trans>Step 3 of 4 – Select a day and time</Trans>
        break
      case '/review':
        pathTitle = <Trans>Step 4 of 4 – Review your request</Trans>
        break
      case '/confirmation':
        pathTitle = <Trans>Thank you! Your request has been received.</Trans>
        break
      case '/cancel':
        pathTitle = <Trans>Cancel an appointment</Trans>
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
