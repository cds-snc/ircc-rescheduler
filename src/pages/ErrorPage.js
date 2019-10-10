import React from 'react'
import { Trans } from '@lingui/react'
import { NavLink } from 'react-router-dom'
import { H1, theme } from '../styles'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import Chevron from '../components/Chevron'
import styled from '@emotion/styled'
import { css } from 'emotion'


const ErrorH1 = styled(H1)`
  margin-bottom: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
  font-weight: normal;
`

const contentClass = css`
  p {
    margin-bottom: ${theme.spacing.md};
  }
`
export class ErrorPageContent extends React.Component {
  render() {
    return (
      <section>
        <ErrorH1>
          <Trans>Sorry, something went wrong.</Trans>
        </ErrorH1>
        <p>
          <Trans>Your request</Trans>{' '}
          <strong>
            <Trans>was not completed</Trans>
          </strong>
          .{' '}
          <Trans>
            Your appointment or application wasn&rsquo;t changed in any way
          </Trans>
          .
        </p>
      </section>
    )
  }
}

class ErrorPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass}>
        <Title path={this.props.match.path} />
        <NavLink className="chevron-link" to="/">
          <Chevron dir="left" /> <Trans>Home</Trans>
        </NavLink>
        <ErrorPageContent />
      </Layout>
    )
  }
}
ErrorPage.propTypes = matchPropTypes

export default ErrorPage
