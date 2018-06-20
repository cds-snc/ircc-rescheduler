import React from 'react'
import { Trans } from 'lingui-react'
import { NavLink } from 'react-router-dom'
import { H1, visuallyhidden, theme } from '../styles'
import Layout from '../components/Layout'
import Contact from '../components/Contact'
import styled, { css } from 'react-emotion'

const ErrorH1 = styled(H1)`
  margin-bottom: ${theme.spacing.sm};
`

const contentClass = css`
  p:last-of-type {
    margin-bottom: ${theme.spacing.md};
  }
`

class ErrorPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass} headerClass={visuallyhidden}>
        <ErrorH1>
          <Trans>We&apos;re sorry, something went wrong.</Trans>
        </ErrorH1>
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
