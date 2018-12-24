import React from 'react'
import { Trans } from '@lingui/react'
import Chevron from '../components/Chevron'
import { css } from 'emotion'
import { NavLink } from 'react-router-dom'
import { H1, theme } from '../styles'
import Layout from '../components/Layout'
import IRCCAbbr from '../components/IRCCAbbr'
import Title, { matchPropTypes } from '../components/Title'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.lg};
  }
`

class FourOhFourPage extends React.Component {
  render() {
    const { match } = this.props
    const showContact = !(match.url === '/not-found')
    return (
      <Layout contentClass={contentClass} contact={showContact}>
        <Title path={this.props.match.path} />
        <section>
          <H1 style={{ marginBottom: `${theme.spacing.md}` }}>
            <Trans>Page not found.</Trans>
          </H1>
          <p>
            <Trans>
              The page you’re trying to reach doesn’t exist. Please retry the
              link in the email or letter you received from
            </Trans>
            <IRCCAbbr />.
          </p>
          {/*
          If the page name is not-found use the page as a generic
          not found page i.e. no location
        */}
          {showContact && (
            <NavLink className="chevron-link" to="/">
              <Chevron dir="left" />
              <Trans>Home</Trans>
            </NavLink>
          )}
        </section>
      </Layout>
    )
  }
}
FourOhFourPage.propTypes = matchPropTypes

export default FourOhFourPage
