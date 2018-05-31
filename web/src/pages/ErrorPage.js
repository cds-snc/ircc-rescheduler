import React from 'react'
import { Trans } from 'lingui-react'
import { NavLink } from 'react-router-dom'
import { H1 } from '../styles'
import Layout from '../components/Layout'
import Contact from '../components/Contact'

class ErrorPage extends React.Component {
  render() {
    return (
      <Layout>
        <H1>
          <Trans>We&apos;re sorry, something went wrong.</Trans>
        </H1>
        <Contact>
          <div>
            <p>
              <Trans>
                Our team has been notified, but click{' '}
                <a
                  tabIndex="0"
                  href="#bug-report"
                  onClick={e => {
                    e.preventDefault()
                    window &&
                      window.Raven.lastEventId() &&
                      window.Raven.showReportDialog()
                  }}
                  aria-label={<Trans>Report a bug</Trans>}
                >
                  here
                </a>{' '}
                to fill out an error report.
              </Trans>
            </p>
            <p>
              <Trans>
                Please contact{' '}
                <abbr title="Immigration, Refugees and Citizenship Canada">
                  IRCC
                </abbr>{' '}
                directly to reschedule your appointment
              </Trans>
            </p>
          </div>
        </Contact>
        <NavLink to="/">
          ← <Trans>Home</Trans>
        </NavLink>
      </Layout>
    )
  }
}

export default ErrorPage
