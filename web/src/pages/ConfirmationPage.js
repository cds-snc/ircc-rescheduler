import React from 'react'
import { H1, H2, visuallyhidden, theme } from '../styles'
import { css } from 'react-emotion'
import { Trans } from 'lingui-react'
import Layout from '../components/Layout'
import Contact from '../components/Contact'
import { respondByDate } from '../utils/calendarDates'
import withContext from '../withContext'
import { contextPropTypes } from '../context'

const contentClass = css`
  p {
    margin-top: ${theme.spacing.xs};
  }

  section {
    margin-bottom: 0;
  }
`

class ConfirmationPage extends React.Component {
  hasEmailError() {
    const { match } = this.props
    if (match.params.error && match.params.error === 'client-request-issue') {
      return true
    }

    return false
  }

  render() {
    let {
      context: {
        store: {
          calendar: { selectedDays = [] } = {},
          language: locale = 'en',
        } = {},
      } = {},
    } = this.props

    let respondBy = ''

    if (selectedDays) {
      respondBy = respondByDate(selectedDays, locale)
    }

    return (
      <Layout contentClass={contentClass} headerClass={visuallyhidden}>
        <section>
          <H1>
            <Trans>Thank you! Your request has been received.</Trans>
          </H1>

          {!this.hasEmailError() ? (
            <p>
              <Trans>We&rsquo;ve sent you a confirmation email.</Trans>
            </p>
          ) : (
            <p>
              <Trans>Email failed to send</Trans>
            </p>
          )}

          <H2>
            <Trans>What happens next?</Trans>
          </H2>
          <p>
            <Trans>By</Trans> {respondBy}
            , <Trans>your local</Trans>{' '}
            <abbr title="Immigration, Refugees and Citizenship Canada">
              IRCC
            </abbr>{' '}
            <Trans>
              office will send you a new appointment, or email you to ask for
              more information.
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

ConfirmationPage.propTypes = {
  ...contextPropTypes,
}

export default withContext(ConfirmationPage)
