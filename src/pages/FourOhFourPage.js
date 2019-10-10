import React from 'react'
import { Trans } from '@lingui/react'
import Chevron from '../components/Chevron'
import { css } from 'emotion'
import { NavLink } from 'react-router-dom'
import { H1, theme } from '../styles'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import DateModified from '../components/DateModified'
import { ReportButton } from '../components/forms/ReportButton'

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
            <Trans>Something went wrong.</Trans>
          </H1>
          <p>
            <Trans>
            We are temporarily experiencing technical difficulties.
            <div>Please try again later. Sorry for any inconvenience.</div>
            
            </Trans>
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
        <ReportButton />
        <DateModified /> 
      </Layout>
    )
  }
}
FourOhFourPage.propTypes = matchPropTypes

export default FourOhFourPage
