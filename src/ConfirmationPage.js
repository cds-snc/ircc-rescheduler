import React from 'react'
import { css } from 'emotion'
import { theme, H1, H2, Content } from './styles'
import { Trans } from 'lingui-react'
import PageHeader from './PageHeader'
import AlphaBanner from './AlphaBanner'
import FederalBanner from './FederalBanner'
import Footer from './Footer'

const main = css`
  section > h1 {
    margin-bottom: 0;
  }

  section > p + h2 {
    margin-top: ${theme.spacing.xl};
  }

  section > p {
    margin-top: ${theme.spacing.xs};
    margin-bottom: ${theme.spacing.xs};
  }
`

class ConfirmationPage extends React.Component {
  render() {
    return (
      <div>
        <AlphaBanner>
          {' '}
          <span>
            <Trans>This is a new service we are constantly improving.</Trans>
          </span>{' '}
        </AlphaBanner>
        <FederalBanner />
        <main role="main" className={main}>
          <PageHeader>
            <H1>
              <Trans>Request a new Canadian Citizenship test date</Trans>
            </H1>
          </PageHeader>
          <Content>
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
                Within two weeks, your local Immigration office will send you a
                new appointment, or email you to ask for more information.
              </Trans>
            </p>
            <H2>
              <Trans>If you have any questions, please contact:</Trans>
            </H2>
            <p>vancouverIRCC@cic.gc.ca</p>
            <p>1-888-242-2100</p>
          </Content>
          <Footer topBarBackground="black" />
        </main>
      </div>
    )
  }
}

export default ConfirmationPage
