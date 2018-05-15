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
          <Trans>We tried to send your request but failed.</Trans>
        </H1>
        <p>
          <Trans>
            We&apos;ll have to look into this. In the mean time, you should
            contact IRCC directly and ask them to change your appointment:
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
