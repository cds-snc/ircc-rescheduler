import React from 'react'
import { css } from 'emotion'
import { theme, H1, H2, Content } from './styles'
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
          <span>This is a new service we are constantly improving.</span>{' '}
        </AlphaBanner>
        <FederalBanner />
        <main role="main" className={main}>
          <PageHeader>
            <H1>Request a new Canadian Citizenship test date</H1>
          </PageHeader>
          <Content>
            <H1>Thank you! Your request has been received.</H1>
            <p>We’ve sent you a confirmation email.</p>
            <H2>What happens next?</H2>
            <p>
              Within two weeks, your local Immigration office will send you a
              new appointment, or email you to ask for more information.
            </p>
            <H2>If you have any questions, please contact:</H2>
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
