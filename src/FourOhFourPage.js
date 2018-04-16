import React from 'react'
import { H1, H2, ErrorMessage } from './styles'
import { NavLink } from 'react-router-dom'
import Layout from './Layout'

class FourOhFourPage extends React.Component {
  render() {
    return (
      <Layout>
        <H1>404: Page not found</H1>
        <H2>Oops! We can’t seem to find the page you are looking for:</H2>
        <ErrorMessage>
          If you wish to restart the rescheduling process, please navigate to
          the Home Page and start the process again.
        </ErrorMessage>
        <NavLink to="/">← Go Back</NavLink>
      </Layout>
    )
  }
}

export default FourOhFourPage
