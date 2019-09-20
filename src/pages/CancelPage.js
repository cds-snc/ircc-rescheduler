import React from 'react'
import { Trans } from '@lingui/react'
import { css } from 'emotion'
import { NavLink } from 'react-router-dom'
import { H1, H2, theme } from '../styles'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import Contact from '../components/Contact'
import Chevron from '../components/Chevron'

const contentClass = css`
  p {
    margin-top: ${theme.spacing.xs};
  }

  .nav-link-top {
    display: inline-block;
    margin-bottom: ${theme.spacing.lg};
  }

  .chevron-link-top path {
    fill: #1c2bf0;
  }

  .chevron-link-top:visited path {
    fill: #572c94;
  }
`
class CancelPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass}>
        <Title path={this.props.match.path} />
        <section>
          <NavLink className="chevron-link nav-link-top" to="/">
            <Chevron dir="left" />
            <Trans>Start over</Trans>
          </NavLink>
          <H1>
            <Trans>Your request has been cancelled.</Trans>
          </H1>
          <p>
            <Trans>
              Nothing about your application or appointment has been changed.
            </Trans>
          </p>
        </section>
        <section>
          <H2>
            <Trans>What happens next?</Trans>
          </H2>
          <p>
            <Trans>
              Please attend your appointment at the date and time specified in
              the email we sent you.
            </Trans>
          </p>
          <p>
            <Trans>
              If you missed your appointment, you still need to contact IRCC
              within 30 days. If you don’t, your application could be delayed or
              abandoned.
            </Trans>
          </p>
          <Contact>
            <H2>
              <Trans>If you have any questions, please contact:</Trans>
            </H2>
          </Contact>
        </section>
      </Layout>
    )
  }
}
CancelPage.propTypes = matchPropTypes

export default CancelPage
