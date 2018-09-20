import React from 'react'
import { Trans } from '@lingui/react'
import { css } from 'react-emotion'
import { H1, theme } from '../styles'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import IRCCAbbr from '../components/IRCCAbbr'
import Contact from '../components/Contact'

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
        <H1 style={{ marginBottom: `${theme.spacing.md}` }}>
          <Trans>Server Error.</Trans>
        </H1>
        <p>
          <Trans>
            Please try the link in your email or letter again. If you keep
            seeing this page, please contact
          </Trans>{' '}
          <IRCCAbbr /> <Trans>directly to reschedule your appointment.</Trans>
        </p>

        <Contact phoneFirst={true} showEmail={false} />
      </Layout>
    )
  }
}
FiveHundredPage.propTypes = matchPropTypes

export default FiveHundredPage
