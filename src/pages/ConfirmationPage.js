import React from 'react'
import { H2, theme, visuallyhidden, BottomContainer } from '../styles'
import styled from '@emotion/styled'
import { css } from 'emotion'
import { Trans } from '@lingui/react'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import withContext from '../withContext'
import { contextPropTypes } from '../context'
import { LongReminder } from '../components/Reminder'
import FocusedH1 from '../components/FocusedH1'
import { sortSelectedDays } from '../utils/calendarDates'
import { dateToISODateString } from '../components/Time'
import Confirmation from '../components/Confirmation'
import { ReportButton } from '../components/forms/ReportButton'

const contentClass = css`
  p {
    margin-top: ${theme.spacing.xs};
    padding-bottom: ${theme.spacing.md};
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
const spacingButton = css`
  position: relative;
  top: 2px;
`
const EmailError = () => {
  return (
    <React.Fragment>
      <Reminder>
        <Trans>
          Sorry, something went wrong. We received your request, but you might
          not get a confirmation email. Please make note of your request
          information
        </Trans>
      </Reminder>
    </React.Fragment>
  )
}

class ConfirmationPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { sending: false }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.setState({ sending: true })
  }

  translateReason(reason) {
    if (reason) {
      switch (reason[0]) {
        case 'yes':
          return <Trans>Yes</Trans>
        default:
          return <Trans>No</Trans>
      }
    } else {
      return <Trans>No</Trans>
    }
  }

  hashFromData( email, paperFileNumber ){
    var hash = 0, i, chr
    const keys = email+paperFileNumber
    if (keys.length === 0) return hash;
    for (i = 0; i < keys.length; i++) {
      chr   = keys.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; 
    }
    return hash;
  }

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
          register: {
            paperFileNumber,
            email,
            familyCheck,
            familyOption,
            // hashFromData,
          } = {},

          calendar: { selectedDays = [], selectedTime } = {},
          selectProvince: { locationCity, locationAddress } = {},
        } = {},
      } = {},
    } = this.props

    // const { sending } = this.state

    let days = []

    if (selectedDays) {
      days = sortSelectedDays(
        selectedDays.map(day => {
          return new Date(dateToISODateString(day))
        }),
      )
    }

    return (
      <Layout contentClass={contentClass}>
        <Title path={this.props.match.path} />
        <FocusedH1 className={visuallyhidden}>
          <Trans>Confirmation</Trans>
        </FocusedH1>
        {!this.hasEmailError() ? (
          <p>
            <Trans>We&rsquo;ve sent you a confirmation email.</Trans>
          </p>
        ) : (
          <EmailError />
        )} 

        <section>
          <Confirmation
            hashFromData={this.hashFromData( email, paperFileNumber ).toString()}
            paperFileNumber={paperFileNumber}
            email={email}
            accessibility={this.translateReason(familyCheck)}
            privacy={this.translateReason(familyOption)}
            location={
              locationCity && locationAddress
                ? locationCity + ', ' + locationAddress
                : ''
            }
            selectedDays={days}
            selectedTime={selectedTime}
          />

          

          <H2 id='reminder-text'>
            <Trans>What happens next?</Trans>
          </H2>
          <p>
            <Trans>
              Remember to bring: <br />
              1.- Your BIL letter <br />
              2.- This confirmation number <br />
              3.- Your immigration papers <br /> <br />
            </Trans>

            <Trans>
              <i>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua...
              </i>
            </Trans>
          </p>
        </section>
        <div className={spacingButton}>
          <BottomContainer>
            <ReportButton />
          </BottomContainer>
        </div>
      </Layout>
    )
  }
}

ConfirmationPage.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
}

export default withContext(ConfirmationPage)
