import React from 'react'
import { Trans } from 'lingui-react'
import { css } from 'react-emotion'
import { NavLink } from 'react-router-dom'
import { H1, H2, theme, visuallyhidden } from '../styles'
import Layout from '../components/Layout'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.md};
  }

  h2 {
    margin-top: 0;
  }

  .nav-link-top {
    display: inline-block;
    padding-bottom: ${theme.spacing.lg};
  }
`

class CancelPage extends React.Component {
  render() {
    return (
      <Layout contentClass={contentClass} headerClass={visuallyhidden}>
        <NavLink className="nav-link-top" to="/">
          ← <Trans>Start Over</Trans>
        </NavLink>

        <H1>
          <Trans>Your request has been cancelled.</Trans>
        </H1>
        <p>
          <Trans>
            Nothing about your application or appointment has been changed.
          </Trans>
        </p>
        <H2>
          <Trans>What happens next?</Trans>
        </H2>
        <p>
          <Trans>
            Please attend your appointment at the date and time specified in the
            email we sent you.
          </Trans>
        </p>
        <p>
          <Trans>
            If you missed your appointment, you still need to contact IRCC
            within 30 days. If you don‘t, your application could be delayed or
            abandoned.
          </Trans>
        </p>

        <H2>
          <Trans>If you have any questions, please contact:</Trans>
        </H2>
        <div>
          <a href="mailto:vancouverIRCC@cic.gc.ca">vancouverIRCC@cic.gc.ca</a>
          <br />
          1-888-242-2100
        </div>
      </Layout>
    )
  }
}

export default CancelPage
