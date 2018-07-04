import React from 'react'
import { H1, H2, visuallyhidden, theme } from '../styles'
import { css } from 'react-emotion'
import { Trans } from 'lingui-react'
import Layout from '../components/Layout'
import Contact from '../components/Contact'
import { respondByDate } from '../utils/calendarDates'
import withContext from '../withContext'

const contentClass = css`
  p {
    margin-top: ${theme.spacing.xs};
  }

  section {
    margin-bottom: 0;
  }
`

class ConfirmationPage extends React.Component {
  render() {
    let {
      context: { store: { calendar: { selectedDays = [] } = {} } = {} } = {},
    } = this.props

    let respondBy = ''

    let locale = 'en'

    if (
      this.props &&
      this.props.context &&
      this.props.context.store &&
      this.props.context.store.language
    ) {
      locale = this.props.context.store.language
    }

    if (selectedDays) {
      respondBy = respondByDate(selectedDays, locale)
    }

    return (
      <Layout contentClass={contentClass} headerClass={visuallyhidden}>
        <section>
          <H1>
            <Trans>Thank you! Your request has been received.</Trans>
          </H1>

          <p>
            <Trans>We&rsquo;ve sent you a confirmation email.</Trans>
          </p>

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

export default withContext(ConfirmationPage)
