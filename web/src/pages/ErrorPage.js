import React from 'react'
import { Trans } from 'lingui-react'
import { NavLink } from 'react-router-dom'
import { H1, visuallyhidden, theme } from '../styles'
import Layout from '../components/Layout'
import Contact from '../components/Contact'
import Chevron from '../components/Chevron'
import styled, { css } from 'react-emotion'

const ErrorH1 = styled(H1)`
  margin-bottom: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
  font-weight: normal;
`

const contentClass = css`
  p:last-of-type {
    margin-bottom: ${theme.spacing.md};
  }
`
export class ErrorPageContent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ErrorH1>
          <Trans>Sorry, something went wrong.</Trans>
        </ErrorH1>
        <p>
          <Trans>
            Your request <strong>was not completed</strong>. Your appointment or
            application wasn&rsquo;t changed in any way.
          </Trans>
        </p>

        <Contact>
          <div>
            <p>
              <Trans>
                Contact{' '}
                <abbr title="Immigration, Refugees and Citizenship Canada">
                  IRCC
                </abbr>{' '}
                directly to reschedule your appointment:
              </Trans>
            </p>
          </div>
        </Contact>
        <p>
          <Trans>
            Our team has been notified of this error, but you can also{' '}
            <a
              tabIndex="0"
              href="#bug-report"
              onClick={e => {
                e.preventDefault()
                window &&
                  window.Raven.lastEventId() &&
                  window.Raven.showReportDialog()
              }}
              aria-label={<Trans>Tell us what went wrong</Trans>}
            >
              tell us what went wrong
            </a>.
          </Trans>
        </p>
      </React.Fragment>
    )
  }
}

class ErrorPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass} headerClass={visuallyhidden}>
        <NavLink className="chevron-link" to="/">
          <Chevron dir="left" /> <Trans>Home</Trans>
        </NavLink>
        <ErrorPageContent />
      </Layout>
    )
  }
}

export default ErrorPage
