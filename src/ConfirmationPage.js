import React from 'react'
import { css } from 'emotion'
import { theme, H1, H2 } from './styles'
import { Trans } from 'lingui-react'
import Layout from './Layout'

const contentClass = css`
  h1 {
    margin-bottom: 0;
  }

  p + h2 {
    margin-top: ${theme.spacing.xl};
  }

  p {
    margin-top: ${theme.spacing.xs};
    margin-bottom: ${theme.spacing.xs};
  }
`

class ConfirmationPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass}>
        <H1>
          <Trans>Thank you! Your request has been received.</Trans>
        </H1>
        <p>
          <Trans>We’ve sent you a confirmation email.</Trans>
        </p>
        <H2>
          <Trans>What happens next?</Trans>
        </H2>
        <p>
          <Trans>
            Within six weeks, your local Immigration office will send you a new
            appointment, or email you to ask for more information.
          </Trans>
        </p>
        <H2>
          <Trans>If you have any questions, please contact:</Trans>
        </H2>
        <p>vancouverIRCC@cic.gc.ca</p>
        <p>1-888-242-2100</p>
      </Layout>
    )
  }
}

export default ConfirmationPage
