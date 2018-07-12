import React from 'react'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { css } from 'react-emotion'
import { Trans } from 'lingui-react'
import { NavLink } from 'react-router-dom'
import { H1, theme, BottomContainer, TopContainer, arrow } from '../styles'
import Chevron from '../components/Chevron'
import Layout from '../components/Layout'
import Button from '../components/forms/Button'
import Summary from '../components/Summary'
import Reminder from '../components/Reminder'
import rightArrow from '../assets/rightArrow.svg'
import CancelButton from '../components/CancelButton'
import PropTypes from 'prop-types'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.lg};
  }
`

const Submit = props => {
  return (
    <BottomContainer>
      <form action="/submit" method="post">
        <input type="hidden" name="fullName" value={props.fullName} />
        <input
          type="hidden"
          name="paperFileNumber"
          value={props.paperFileNumber}
        />
        <input type="hidden" name="email" value={props.email} />
        <input type="hidden" name="explanation" value={props.explanation} />
        <input type="hidden" name="reason" value={props.reason} />
        <input type="hidden" name="selectedDays" value={props.selectedDays} />
        <Button type="submit">
          <Trans>Send request</Trans>{' '}
          <img src={rightArrow} className={arrow} alt="" />
        </Button>
      </form>
      <CancelButton />
    </BottomContainer>
  )
}

Submit.propTypes = {
  fullName: PropTypes.string,
  email: PropTypes.string,
  reason: PropTypes.string,
  explanation: PropTypes.string,
  paperFileNumber: PropTypes.string,
  selectedDays: PropTypes.array,
}

class ReviewPage extends React.Component {
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
            reason,
            explanation,
          } = {},
          calendar: { selectedDays = [] } = {},
        } = {},
      } = {},
    } = this.props

    return (
      <Layout contentClass={contentClass}>
        <TopContainer>
          <NavLink className="chevron-link" to="/calendar">
            <Chevron dir="left" />
            <Trans>Go back</Trans>
          </NavLink>
        </TopContainer>
        <H1>
          <Trans>Review your request:</Trans>
        </H1>

        <section>
          <Summary
            fullName={fullName}
            email={email}
            paperFileNumber={paperFileNumber}
            explanation={explanation}
            reason={this.translateReason(reason)}
            selectedDays={selectedDays}
          />
          <Reminder>
            <Trans>
              Sending this request will cancel your current appointment.
              <strong> Do not attend your old appointment</strong> after you
              send this request.
            </Trans>
          </Reminder>
          <Submit
            fullName={fullName}
            email={email}
            paperFileNumber={paperFileNumber}
            explanation={explanation}
            reason={reason}
            selectedDays={selectedDays}
          />
        </section>
      </Layout>
    )
  }
}
ReviewPage.propTypes = {
  ...contextPropTypes,
}

export default withContext(ReviewPage)
