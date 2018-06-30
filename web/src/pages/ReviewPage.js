import React from 'react'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { css } from 'react-emotion'
import { Trans } from 'lingui-react'
import { NavLink, Redirect } from 'react-router-dom'
import { H1, theme, BottomContainer, TopContainer, arrow } from '../styles'
import Chevron from '../components/Chevron'
import Layout from '../components/Layout'
import { SUBMIT } from '../queries'
import Button from '../components/forms/Button'
import Summary from '../components/Summary'
import { Submission } from '../components/Submission'
import Reminder from '../components/Reminder'
import rightArrow from '../assets/rightArrow.svg'
import { dateToISODateString } from '../components/Time'
import CancelButton from '../components/CancelButton'
import { windowExists } from '../utils/windowExists'
import PropTypes from 'prop-types'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.lg};
  }
`

const JSBottomContainer = ({
  fullName,
  email,
  reason,
  explanation,
  paperFileNumber,
  selectedDays,
}) => {
  return (
    <BottomContainer>
      <Submission
        action={SUBMIT}
        success={data => <Redirect to="/confirmation" push />}
        failure={error => <Redirect to="/error" push />}
      >
        {(submit, loading) => (
          <Button
            disabled={loading}
            onClick={() => {
              submit({
                variables: {
                  fullName,
                  email,
                  reason,
                  explanation,
                  paperFileNumber,
                  availability: selectedDays.map(day =>
                    dateToISODateString(day),
                  ),
                },
              })
            }}
          >
            <Trans>Send request</Trans>{' '}
            <img src={rightArrow} className={arrow} alt="" />
          </Button>
        )}
      </Submission>
      <div>
        <CancelButton />
      </div>
    </BottomContainer>
  )
}

JSBottomContainer.propTypes = {
  fullName: PropTypes.string,
  email: PropTypes.string,
  reason: PropTypes.string,
  explanation: PropTypes.string,
  paperFileNumber: PropTypes.string,
  availability: PropTypes.string,
  selectedDays: PropTypes.array,
}

const WhichSubmit = props => {
  if (windowExists()) {
    return <JSBottomContainer {...props} />
  }

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
        <input type="hidden" name="availability" value={props.selectedDays} />
        <Button type="submit">
          <Trans>Send request No JS</Trans>
          <img src={rightArrow} className={arrow} alt="" />
        </Button>
      </form>
      <CancelButton />
    </BottomContainer>
  )
}

WhichSubmit.propTypes = {
  fullName: PropTypes.string,
  email: PropTypes.string,
  reason: PropTypes.string,
  explanation: PropTypes.string,
  paperFileNumber: PropTypes.string,
  availability: PropTypes.string,
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
          calendar: { calendar: selectedDays = [] } = {},
        } = {},
      } = {},
    } = this.props

    /* TODO: handle a NO-JS submission */

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
          <WhichSubmit
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
