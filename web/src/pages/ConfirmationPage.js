import React from 'react'
import PropTypes from 'prop-types'
import { H1, H2, visuallyhidden, theme } from '../styles'
import styled, { css } from 'react-emotion'
import { Trans } from 'lingui-react'
import Layout from '../components/Layout'
import Contact from '../components/Contact'
import IRCCAbbr from '../components/IRCCAbbr'
import { respondByDate } from '../utils/calendarDates'
import withContext from '../withContext'
import { contextPropTypes } from '../context'
import { LongReminder } from '../components/Reminder'
import { SelectedDayList } from '../components/SelectedDayList'

const contentClass = css`
  p {
    margin-top: ${theme.spacing.xs};
  }

  section {
    margin-bottom: 0;
  }
`

const Reminder = styled(LongReminder)`
  margin-bottom: ${theme.spacing.xl} !important;
`

const Availability = styled('div')`
  border-left: 2px solid ${theme.colour.greyLight};
  padding-left: ${theme.spacing.xl};
  margin-left: ${theme.spacing.lg};
`

const EmailError = ({ selectedDays }) => {
  return (
    <React.Fragment>
      <Reminder>
        <Trans>
          Sorry, something went wrong. We received your request, but you might
          not get a confirmation email. Please make note of your request
          information
        </Trans>
      </Reminder>
      <Availability>
        <div>
          <strong>
            <Trans>Availability:</Trans>
          </strong>
        </div>
        <SelectedDayList selectedDays={selectedDays} />
      </Availability>
    </React.Fragment>
  )
}

EmailError.propTypes = {
  selectedDays: PropTypes.array.isRequired,
}

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
            <EmailError selectedDays={selectedDays} />
          )}

          <H2>
            <Trans>What happens next?</Trans>
          </H2>
          <p>
            <Trans>By</Trans> {respondBy}
            , <Trans>your local</Trans> <IRCCAbbr />{' '}
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
