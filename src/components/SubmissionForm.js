import React from 'react'
import PropTypes from 'prop-types'
import Button from '../components/forms/Button'
import { BottomContainer } from '../styles'
import { Trans } from '@lingui/react'
import { css } from 'emotion'
import { GoArrowRight } from 'react-icons/go'

const goArrowRight = css`
  font-size: 24px;
  vertical-align: middle;
  left: 9px;
  height: 1.3rem;
  width: 1.3rem;
  bottom: 0.058em;
  position: relative;
`

const SubmissionForm = props => {
  const { sending, onSubmit } = props
  return (
    <BottomContainer>
      <form id="review-form" action="/submit" method="post" onSubmit={onSubmit}>
        <input type="hidden" name="paperFileNumber" value={props.paperFileNumber} />
        <input type="hidden" name="accessibility" value={props.accessibility} />
        <input type="hidden" name="email" value={props.email} />
        <input type="hidden" name="location" value={props.location} />
        <input type="hidden" name="selectedDay" value={props.selectedDays} />
        <input type="hidden" name="selectedTime" value={props.selectedTime} />
        <input
          type="hidden"
          name="templateId"
          value="af563da5-43bd-4b9a-9610-e3990a7f4315"
        />
        <input type="hidden" name="hashFromData" value={props.hashFromData} />

        <Button type="submit" disabled={sending}>
          <Trans>Send request</Trans> <GoArrowRight className={goArrowRight} />
        </Button>
      </form>
    </BottomContainer>
  )
}

SubmissionForm.propTypes = {
  hashFromData: PropTypes.string,
  paperFileNumber: PropTypes.string,
  accessibility: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  selectedDays: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  selectedTime: PropTypes.string,
  sending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default SubmissionForm
