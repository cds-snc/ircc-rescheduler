import React from 'react'
import { Trans } from '@lingui/react'
import { css } from 'emotion'
import { H1, theme } from '../styles'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import DateModified from '../components/DateModified'
import { ReportButton } from '../components/forms/ReportButton'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.lg};
  }
`

class FiveHundredPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass} contact={false}>
        <Title path={this.props.match.path} />
        <section>
          <H1 id="header" style={{ marginBottom: `${theme.spacing.md}` }}>
            <Trans>Something went wrong.</Trans>
          </H1>
          <p>
            <Trans>
            We are temporarily experiencing technical difficulties.
            Please try again later. Sorry for any inconvenience.
            </Trans>{' '}
          </p>
        </section>
        <ReportButton />
        <DateModified />
      </Layout>
    )
  }
}
FiveHundredPage.propTypes = matchPropTypes

export default FiveHundredPage
