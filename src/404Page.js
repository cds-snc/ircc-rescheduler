import React from 'react'
import { H1, H2, ErrorContent, ErrorMessage } from './styles'
import { NavLink } from 'react-router-dom'
import PageHeader from './PageHeader'
import AlphaBanner from './AlphaBanner'
import FederalBanner from './FederalBanner'
import Footer from './Footer'

class TestPage extends React.Component {
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

          <ErrorContent>
            <H1>404: Page not found</H1>
            <H2>Oops! We cant seem to find the page you are looking for:</H2>
            <ErrorMessage>
              If you wish to restart the rescheduling process, please navigate
              to the Home Page and start the process again.
            </ErrorMessage>
            <NavLink to="/">
              <p>← Go Back</p>
            </NavLink>
          </ErrorContent>

          <Footer topBarBackground="black" />
        </main>
      </div>
    )
  }
}

export default TestPage
