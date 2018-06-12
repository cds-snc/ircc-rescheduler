import React from 'react'
import { H1, H2, visuallyhiddenMobile } from '../styles'
import { Trans } from 'lingui-react'
import Layout from '../components/Layout'
import Contact from '../components/Contact'

class ConfirmationPage extends React.Component {
  render() {
    return (
      <Layout headerClass={visuallyhiddenMobile}>
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
          <Contact>
            <H2>
              <Trans>If you have any questions, please contact:</Trans>
            </H2>
          </Contact>
        </section>
      </Layout>
    )
  }
}

export default ConfirmationPage
