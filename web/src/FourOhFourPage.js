import React from 'react'
import { css } from 'react-emotion'
import { NavLink } from 'react-router-dom'
import { H1, H2, theme } from './styles'
import Layout from './Layout'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.lg};
  }
`

class FourOhFourPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass}>
        <H1>404: Page not found</H1>
        <H2>Oops! We can’t seem to find the page you are looking for:</H2>
        <p>
          If you wish to restart the rescheduling process, please navigate to
          the Home Page and start the process again.
        </p>
        <NavLink to="/">← Go Back</NavLink>
      </Layout>
    )
  }
}

export default FourOhFourPage
