import React from 'react'
import PropTypes from 'prop-types'
import { H2, theme } from '../styles'
import styled from '@emotion/styled'
import { css } from 'emotion'
import { Trans } from '@lingui/react'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import Contact from '../components/Contact'
import IRCCAbbr from '../components/IRCCAbbr'
import withContext from '../withContext'
import { contextPropTypes } from '../context'
import { LongReminder } from '../components/Reminder'
import { SelectedDayList } from '../components/SelectedDayList'
import FocusedH1 from '../components/FocusedH1'
import getMonth from 'date-fns/get_month'

const contentClass = css`
  p {
    margin-top: ${theme.spacing.xs};
  }

  section {
    margin-bottom: 0;
  }

  h2:last-of-type {
    margin-bottom: ${theme.spacing.sm};
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

  getLastMonth(arr, lang = 'en') {
    const month = getMonth(arr.sort((a, b) => a > b)[arr.length - 1])

    if (month === 9) {
      return lang === 'en' ? 'October' : 'octobre'
    }
    if (month === 10) {
      return lang === 'en' ? 'November' : 'novembre'
    }

    if (month === 11) {
      return lang === 'en' ? 'December' : 'décembre'
    }

    return false
  }

  getPreviousMonth(monthString, lang = 'en') {
    if (monthString === 'December') {
      return lang === 'en' ? 'November' : 'novembre'
    }
    if (monthString === 'November') {
      return lang === 'en' ? 'October' : 'octobre'
    }
    if (monthString === 'October') {
      return lang === 'en' ? 'September' : 'septembre'
    }
  }

  render() {
    let {
      context: {
        store: {
          calendar: { selectedDays = [] } = {},
          explanation: { explanationPage } = {},
          language,
        } = {},
      } = {},
    } = this.props

    return (
      <Layout contentClass={contentClass}>
        <Title path={this.props.match.path} />
        <section>
          <FocusedH1>
            <Trans>Thank you! Your request has been received.</Trans>
          </FocusedH1>

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
            <IRCCAbbr />{' '}
            {explanationPage ? (
              <Trans>
                will review your request and get back to you within 1 week.
              </Trans>
            ) : (
              <React.Fragment>
                <Trans>will send you a new appointment.</Trans>{' '}
                <Trans>As you chose at least one date in</Trans>{' '}
                <strong>{this.getLastMonth(selectedDays, language)}</strong>,{' '}
                <Trans>you’ll be contacted in</Trans>{' '}
                <strong>
                  {this.getPreviousMonth(
                    this.getLastMonth(selectedDays),
                    language,
                  )}
                </strong>{' '}
                <Trans>with your new appointment date.</Trans>
              </React.Fragment>
            )}
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
  ...matchPropTypes,
}

export default withContext(ConfirmationPage)
