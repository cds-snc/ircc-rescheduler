import { Trans } from '@lingui/react'
import React from 'react'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { css } from 'emotion'
import { theme, horizontalPadding, mediaQuery } from '../styles'

const container = css`
  ${horizontalPadding};
  width: auto;
  justify-content: space-between;
  background-color: ${theme.colour.white};
`

const govuk_header_label = css`
  margin-bottom: 0.15rem;
  font-family: Lato, sans-serif;
  font-size: ${theme.font.lg};
  font-weight: 400;
  font-style: normal;

  ${mediaQuery.md(css`
    width: 80%;
  `)};

  ${mediaQuery.sm(css`
    width: 100%;
  `)};
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
      case '/500':
        pathTitle = <Trans>Put 500 text here</Trans>
        break
      case '/not-found':
        pathTitle = <Trans>Put 400 text here</Trans>
        break
      default:
      // code block
    }
    return pathTitle
  }

  render() {
    const pathTitle = this.pageHeaderTitle(this.props.pathName)
    return (
      <div className={container}>
        <div>
          <div className={govuk_header_label}>
            <h1>{pathTitle}</h1>
          </div>
        </div>
      </div>
    )
  }
}

HeaderDescription.propTypes = {
  ...contextPropTypes,
}

export default withContext(HeaderDescription)
