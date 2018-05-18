import React from 'react'
import { Trans } from 'lingui-react'
import { NavLink } from 'react-router-dom'
import { H1, H2 } from '../styles'
import Layout from '../components/Layout'
import Contact from '../components/Contact'

class ErrorPage extends React.Component {
  render() {
    return (
      <Layout>
        <H1>
          <Trans>Request failed</Trans>
        </H1>
        <Contact>
          <H2>
            <Trans>
              Please contact{' '}
              <abbr title="Immigration, Refugees and Citizenship Canada">
                IRCC
              </abbr>{' '}
              directly to reschedule your appointment
            </Trans>
          </H2>
        </Contact>
        <NavLink to="/">
          ← <Trans>Home</Trans>
        </NavLink>
      </Layout>
    )
  }
}

export default ErrorPage
