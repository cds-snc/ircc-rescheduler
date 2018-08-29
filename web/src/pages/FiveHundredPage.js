import React from 'react'
import { Trans } from '@lingui/react'
import { css } from 'react-emotion'
import { H1, H2, theme } from '../styles'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.lg};
  }
`

class FiveHundredPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass}>
        <Title path={this.props.match.path} />
        <H1>
          <Trans>Server Error.</Trans>
        </H1>
        <H2>
          <Trans>Sorry, something went wrong.</Trans>
        </H2>
      </Layout>
    )
  }
}
FiveHundredPage.propTypes = matchPropTypes

export default FiveHundredPage