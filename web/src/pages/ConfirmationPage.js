import React from 'react'
import { H1, H2, visuallyhidden } from '../styles'
import { css } from 'react-emotion'
import { Trans } from 'lingui-react'
import Layout from '../components/Layout'
import Contact from '../components/Contact'
import { theme } from '../styles'

const contentClass = css`
  p {
    margin-top: ${theme.spacing.xs};
  }

  section {
    margin-bottom: 0;
  }

  padding-bottom: ${theme.spacing.xxxl};
`

class ConfirmationPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass} headerClass={visuallyhidden}>
        <section>
          <H1>
            <Trans>Thank you! Your request has been received.</Trans>
          </H1>

          <p> We&#39;ve sent you a confirmation email. </p>

          <H2>
            <Trans>What happens next?</Trans>
          </H2>
          <p>
            <Trans>
              By July 6, 2018, your local{' '}
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

          <hr />

          <H2>
            <Trans>Were you satisfied with this service?</Trans>
          </H2>

          <p>
            <Trans>Your feedback helps us improve.</Trans>
          </p>

          <p>
            <a
              href="https://docs.google.com/forms/d/1a1bJDF4BmepyMJaYubOSg3IiW4kjCqFrAu_0QXLYQ8Q/edit"
              target="_blank"
              rel="noopener noreferrer"
            >
              Send us feedback.
            </a>
          </p>
        </section>
      </Layout>
    )
  }
}

export default ConfirmationPage
