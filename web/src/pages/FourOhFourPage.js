import React from 'react'
import { Trans } from 'lingui-react'
import Chevron from '../components/Chevron'
import { css } from 'react-emotion'
import { NavLink } from 'react-router-dom'
import { H1, H2, theme, visuallyhiddenMobile } from '../styles'
import Layout from '../components/Layout'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.lg};
  }
`

class FourOhFourPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass} headerClass={visuallyhiddenMobile}>
        <H1>
          <Trans>Page not found</Trans>
        </H1>
        <H2>
          <Trans>Sorry, the page you are looking for doesn’t exist.</Trans>
        </H2>
        <p>
          <Trans>Return to the home page to reschedule your appointment.</Trans>
        </p>
        <NavLink className="chevron-link" to="/">
          <Chevron dir="left" /><Trans>Home</Trans>
        </NavLink>
      </Layout>
    )
  }
}

export default FourOhFourPage
