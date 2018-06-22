import React from 'react'
import { Trans } from 'lingui-react'
import { css } from 'react-emotion'
import { NavLink } from 'react-router-dom'
import { H1, H2, theme, visuallyhidden } from '../styles'
import Layout from '../components/Layout'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.lg};
  }
`

class CancelPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass} headerClass={visuallyhidden}>
        <H1>
          <Trans>Canceled</Trans>
        </H1>
        <H2>
          <Trans>Please attend your original appointment.</Trans>
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

export default CancelPage
