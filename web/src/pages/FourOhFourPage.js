import React from 'react'
import { Trans } from 'lingui-react'
import { css } from 'react-emotion'
import { NavLink } from 'react-router-dom'
import { H1, H2, theme } from '../styles'
import Layout from '../components/Layout'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.lg};
  }
`

class FourOhFourPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass}>
        <H1>
          <Trans>404: Page not found</Trans>
        </H1>
        <H2>
          <Trans>Sorry, the page you are looking for doesn’t exist.</Trans>
        </H2>
        <p>
          <Trans>
            If you wish to restart the rescheduling process, please navigate to
            the Home Page and start the process again.
          </Trans>
        </p>
        <NavLink to="/">
          <Trans>← Go Back</Trans>
        </NavLink>
      </Layout>
    )
  }
}

export default FourOhFourPage
