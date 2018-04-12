import React from 'react'
import { H1, H2, Content, ConfirmPara } from './styles'
import PageHeader from './PageHeader'
import AlphaBanner from './AlphaBanner'
import FederalBanner from './FederalBanner'
import Footer from './Footer'

class ConfirmationPage extends React.Component {
  render() {
    return (
      <div>
        <AlphaBanner>
          {' '}
          <span>This is a new service we are constantly improving.</span>{' '}
        </AlphaBanner>
        <FederalBanner />
        <main role="main">
          <PageHeader>
            <H1>Request a new Canadian Citizenship test date</H1>
          </PageHeader>
          <Content>
            <H1>Thank you! Your request has been received.</H1>
            <ConfirmPara>We’ve sent you a confirmation email.</ConfirmPara>
            <H2>What happens next?</H2>
            <ConfirmPara>
              Within two weeks, your local Immigration office will send you a
              new appointment, or email you to ask for more information.
            </ConfirmPara>
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
