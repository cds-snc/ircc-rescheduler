import React from 'react'
import { Trans } from 'lingui-react'
import { css } from 'react-emotion'
import { NavLink } from 'react-router-dom'
import { H1, theme } from './styles'
import Layout from './Layout'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.lg};
  }
`

class ErrorPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass}>
        <H1>
          <Trans>Request failed</Trans>
        </H1>
        <p>
          <Trans>
            Please contact IRCC directly in order to change your appointment.
          </Trans>
        </p>
        <p>vancouverIRCC@cic.gc.ca</p>
        <p>1-888-242-2100</p>
        <NavLink to="/">
          <Trans>← Go Back</Trans>
        </NavLink>
      </Layout>
    )
  }
}

export default ErrorPage
