import React from 'react'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { css } from 'emotion'
import { Trans } from '@lingui/react'
import { NavLink } from 'react-router-dom'
import { theme, TopContainer } from '../styles'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import Chevron from '../components/Chevron'
import Summary from '../components/Summary'
//import Reminder from '../components/Reminder'
import SubmissionForm from '../components/SubmissionForm'
import { sortSelectedDays } from '../utils/calendarDates'
import { dateToISODateString } from '../components/Time'
import FocusedH1 from '../components/FocusedH1'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.lg};
  }
`



class ReviewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { sending: false }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.setState({ sending: true })
    this.props.history.push('/confirmation')
  }

  translateReason(reason) {
    if (reason) {
      switch (reason[0]) {
      case 'yes':
        return <Trans>Yes</Trans>
      default:
        return <Trans>No</Trans>
    }} else {
      return <Trans>No</Trans>
    }
  }

  translate(reason) {
    if (reason) {
      switch (reason[0]) {
      case 'yes':
        return <Trans>Yes</Trans>
      default:
        return <Trans>No</Trans>
    }} else {
      return <Trans>No</Trans>
    }
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
          } = {},

          calendar: { selectedDays = [], selectedTime } = {},
          selectProvince: {
            locationCity,
            locationAddress,
          } = {},
        } = {},
      } = {},
    } = this.props

    const { sending } = this.state

    let days = []

    if (selectedDays) {
      days = sortSelectedDays(
        selectedDays.map(day => {
          return new Date(dateToISODateString(day))
        }),
      )
    }
    // eslint-disable-next-line no-console
   // console.log(this.props.context.store)

    // eslint-disable-next-line no-console
  //  console.log(this.props) 
    
    return (
      <Layout contentClass={contentClass}>
        <Title path={this.props.match.path} />
        <TopContainer>
          <NavLink className="chevron-link" to='/calendar'>
            <Chevron dir="left" />
            <Trans>Go back</Trans>
          </NavLink>
        </TopContainer>
        <FocusedH1 id="review-header">
          <Trans>Review your request:</Trans>
        </FocusedH1>

        <section>
          <Summary
            paperFileNumber={paperFileNumber}
            email={email}
            accessibility={this.translateReason(familyCheck)}
            privacy={this.translateReason(familyOption)}
            location={locationCity + ', ' + locationAddress} 
            selectedDays={days}
            selectedTime={selectedTime}
          />
          {/* Note: if updating this text don't forget to update the email templates */}
          {/* <Reminder>
            {explanationPage ? (
              <Trans>
                You should plan to attend your existing appointment until we
                contact you. This may take 1 week.
              </Trans>
            ) : (
              <React.Fragment>
                <Trans>
                  Sending this request will cancel your current appointment.
                </Trans>{' '}
                <strong>
                  <Trans> Do not attend your old appointment</Trans>
                </strong>{' '}
                <Trans>after you send this request.</Trans>
              </React.Fragment>
            )}
          </Reminder> */}
          <SubmissionForm
            email={email}
            paperFileNumber={paperFileNumber}
            accessibility={this.translateReason(familyCheck)}
            privacy={this.translate(familyOption)}
            location={locationCity + ', ' + locationAddress}
            selectedDays={selectedDays}
            sending={sending}
            onSubmit={this.handleSubmit}
          />
        </section>
      </Layout>
    )
  }
}
ReviewPage.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
}

export default withContext(ReviewPage)
