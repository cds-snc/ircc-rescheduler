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
          <Trans>Page not found</Trans>
        </H1>
        <H2>
          <Trans>Sorry, the page you are looking for doesn’t exist.</Trans>
        </H2>
        <p>
          <Trans>Return to the home page to reschedule your appointment.</Trans>
        </p>
        <NavLink to="/">
          ← <Trans>Home</Trans>
        </NavLink>
      </Layout>
    )
  }
}

export default FourOhFourPage
