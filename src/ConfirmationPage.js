import React from 'react'
import { H1, H2, Content } from './styles'
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
            <H1>Reschedule your Canadian Citizenship appointment</H1>
          </PageHeader>
          <Content>
            <H1>Thank you! Your request has been received.</H1>
            <p>We’ve sent you a confirmation email.</p>

            <H2>What happens next?</H2>
            <p>
              Your local immigration office will send you a new appointment, or
              email you to ask for more information.
            </p>

            <H2>If you have any questions, please contact:</H2>
            <p>upto4monthsresponsetime@gc.ca</p>
            <p>(905) 823-8113</p>
          </Content>
          <Footer topBarBackground="black" />
        </main>
      </div>
    )
  }
}

export default ConfirmationPage
