import React from 'react'
import PropTypes from 'prop-types'
import Button from '../components/forms/Button'
import CancelButton from './CancelButton'
import rightArrow from '../assets/rightArrow.svg'
import { BottomContainer, arrow } from '../styles'
import { Trans } from '@lingui/react'

const SubmissionForm = props => {
  const { sending, onSubmit } = props
  return (
    <BottomContainer>
      <form id="review-form" action="/submit" method="post" onSubmit={onSubmit}>
        <input type="hidden" name="fullName" value={props.fullName} />
        <input
          type="hidden"
          name="paperFileNumber"
          value={props.paperFileNumber}
        />
        <input type="hidden" name="email" value={props.email} />
        <input type="hidden" name="explanation" value={props.explanation} />
        <input type="hidden" name="reason" value={props.reason} />
        <input type="hidden" name="familyCheck" value={props.familyCheck} />
        <input type="hidden" name="familyOption" value={props.familyOption} />
        <input type="hidden" name="selectedDays" value={props.selectedDays} />
        <Button type="submit" disabled={sending}>
          <Trans>Send request</Trans>{' '}
          <img src={rightArrow} className={arrow} alt="" />
        </Button>
      </form>
      <CancelButton />
    </BottomContainer>
  )
}

SubmissionForm.propTypes = {
  fullName: PropTypes.string,
  email: PropTypes.string,
  reason: PropTypes.string,
  explanation: PropTypes.string,
  paperFileNumber: PropTypes.string,
  selectedDays: PropTypes.array,
  sending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default SubmissionForm
