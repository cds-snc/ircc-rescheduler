import React from 'react'
import { H1, H2, visuallyhidden, theme } from '../styles'
import { css } from 'react-emotion'
import { Trans } from 'lingui-react'
import Layout from '../components/Layout'
import Contact from '../components/Contact'

const contentClass = css`
  p {
    margin-top: ${theme.spacing.xs};
  }

  section {
    margin-bottom: 0;
  }
`

class ConfirmationPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass} headerClass={visuallyhidden}>
        <section>
          <H1>
            <Trans>Thank you! Your request has been received.</Trans>
          </H1>

          <p> We&rsquo;ve sent you a confirmation email. </p>

          <H2>
            <Trans>What happens next?</Trans>
          </H2>
          <p>
            <Trans>
              By September 6, 2018, your local{' '}
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
