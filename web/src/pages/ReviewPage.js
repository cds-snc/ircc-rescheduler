import React from 'react'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { css } from 'react-emotion'
import { Trans } from '@lingui/react'
import { NavLink } from 'react-router-dom'
import { H1, theme, TopContainer } from '../styles'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import Chevron from '../components/Chevron'
import Summary from '../components/Summary'
import Reminder from '../components/Reminder'
import SubmissionForm from '../components/SubmissionForm'
import { sortSelectedDays } from '../utils/calendarDates'
import { dateToISODateString } from '../components/Time'

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
  }

  translateReason(reason) {
    switch (reason) {
      case 'travel':
        return <Trans>Travel</Trans>
      case 'family':
        return <Trans>Family</Trans>
      case 'medical':
        return <Trans>Medical</Trans>
      case 'workOrSchool':
        return <Trans>Work or School</Trans>
      case 'other':
        return <Trans>Other</Trans>
      default:
        return null
    }
  }

  render() {
    let {
      context: {
        store: {
          register: {
            fullName,
            email,
            paperFileNumber,
            familyOption,
            reason,
            explanation,
          } = {},
          calendar: { selectedDays = [] } = {},
        } = {},
      } = {},
    } = this.props

    const { sending } = this.state

    const days = sortSelectedDays(
      selectedDays.map(day => {
        return new Date(dateToISODateString(day))
      }),
    )

    return (
      <Layout contentClass={contentClass}>
        <Title path={this.props.match.path} />
        <TopContainer>
          <pre>
            {familyOption}
            ddd
          </pre>
          <NavLink className="chevron-link" to="/calendar">
            <Chevron dir="left" />
            <Trans>Go back</Trans>
          </NavLink>
        </TopContainer>
        <H1 id="review-header">
          <Trans>Review your request:</Trans>
        </H1>

        <section>
          <Summary
            fullName={fullName}
            email={email}
            paperFileNumber={paperFileNumber}
            explanation={explanation}
            reason={this.translateReason(reason)}
            selectedDays={days}
          />
          <Reminder>
            <Trans>
              Sending this request will cancel your current appointment.
              <strong> Do not attend your old appointment</strong> after you
              send this request.
            </Trans>
          </Reminder>
          <SubmissionForm
            fullName={fullName}
            email={email}
            paperFileNumber={paperFileNumber}
            explanation={explanation}
            reason={reason}
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
