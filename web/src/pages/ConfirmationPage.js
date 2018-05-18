import React from 'react'
import { H1, H2 } from '../styles'
import { Trans } from 'lingui-react'
import Layout from '../components/Layout'
import TelLink from '../components/TelLink'

class ConfirmationPage extends React.Component {
  render() {
    return (
      <Layout>
        <section>
          <H1>
            <Trans>Thank you! Your request has been received.</Trans>
          </H1>

          <H2>
            <Trans>What happens next?</Trans>
          </H2>
          <p>
            <Trans>
              Within six (6) weeks, your local{' '}
              <abbr title="Immigration, Refugees and Citizenship Canada">
                IRCC
              </abbr>{' '}
              office will send you a new appointment, or email you to ask for
              more information.
            </Trans>
          </p>
          <H2>
            <Trans>If you have any questions, please contact:</Trans>
          </H2>
          <p>
            <a href="mailto:vancouverIRCC@cic.gc.ca">vancouverIRCC@cic.gc.ca</a>
          </p>
          <p>
            <TelLink tel="1-888-242-2100" />
          </p>
        </section>
      </Layout>
    )
  }
}

export default ConfirmationPage
