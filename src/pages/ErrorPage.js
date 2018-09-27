import React from 'react'
import { Trans } from '@lingui/react'
import { NavLink } from 'react-router-dom'
import { H1, theme } from '../styles'
import IRCCAbbr from '../components/IRCCAbbr'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import Contact from '../components/Contact'
import Chevron from '../components/Chevron'
import styled, { css } from 'react-emotion'
import { windowExists } from '../utils/windowExists'

const ErrorH1 = styled(H1)`
  margin-bottom: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
  font-weight: normal;
`

const contentClass = css`
  p {
    margin-bottom: ${theme.spacing.md};
  }
`
export class ErrorPageContent extends React.Component {
  render() {
    return (
      <section>
        <ErrorH1>
          <Trans>Sorry, something went wrong.</Trans>
        </ErrorH1>
        <p>
          <Trans>Your request</Trans>{' '}
          <strong>
            <Trans>was not completed</Trans>
          </strong>
          .{' '}
          <Trans>
            Your appointment or application wasn&rsquo;t changed in any way
          </Trans>
          .
        </p>

        <Contact phoneFirst={true}>
          <div>
            <p>
              <Trans>Please contact </Trans> <IRCCAbbr />{' '}
              <Trans>directly to reschedule your appointment:</Trans>
            </p>
          </div>
        </Contact>
        <p>
          <Trans>
            Our team has been notified of this error, but you can also
          </Trans>{' '}
          {windowExists() && window.Raven && window.Raven.lastEventId() ? (
            <a
              href="mailto:cds-snc@tbs-sct.gc.ca"
              onClick={e => {
                e.preventDefault()
                window.Raven.showReportDialog()
              }}
            >
              <Trans>let us know what happened</Trans>
            </a>
          ) : (
            <a href="mailto:cds-snc@tbs-sct.gc.ca">
              <Trans>send an email to let us know what happened</Trans>
            </a>
          )}
          .
        </p>
      </section>
    )
  }
}

class ErrorPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass}>
        <Title path={this.props.match.path} />
        <NavLink className="chevron-link" to="/">
          <Chevron dir="left" /> <Trans>Home</Trans>
        </NavLink>
        <ErrorPageContent />
      </Layout>
    )
  }
}
ErrorPage.propTypes = matchPropTypes

export default ErrorPage
