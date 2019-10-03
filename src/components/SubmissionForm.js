import React from 'react'
import PropTypes from 'prop-types'
import Button from '../components/forms/Button'
// import CancelButton from './CancelButton'
import { contentClass, theme, mediaQuery, BottomContainer } from '../styles'
import { Trans } from '@lingui/react'

import { css } from 'emotion'
import { GoArrowRight } from 'react-icons/go'
import { ReportButton } from '../components/forms/ReportButton'

const submissionContentClass = css`
  ${contentClass};
  p {
    margin-bottom: ${theme.spacing.sm};

    ${mediaQuery.md(css`
      margin-bottom: ${theme.spacing.lg};
    `)};
  }
  fieldset {
    border: none;
  }
`

const goArrowRight = css`
  font-size: 24px;
  vertical-align: middle;
  left: 9px;
  height: 1.3rem;
  width: 1.3rem;
  bottom: 0.058em;
  position: relative;
`
const spacingButton = css`
  position: relative;
  top: 25px;
`

const SubmissionForm = props => {
  const { sending, onSubmit } = props
  return (
    <div className={submissionContentClass}>
      <div>
        <form
          id="review-form"
          action="/submit"
          method="post"
          onSubmit={onSubmit}
        >
          <input
            type="hidden"
            name="paperFileNumber"
            value={props.paperFileNumber}
          />
          <input type="hidden" name="familyCheck" value={props.familyCheck} />
          <input type="hidden" name="familyOption" value={props.familyOption} />
          <input type="hidden" name="email" value={props.email} />
          {/* <input type="hidden" name="emailConfirm" value={props.emailConfirm} /> */}
          {/* <input type="hidden" name="explanation" value={props.explanation} /> */}
          {/* <input type="hidden" name="reason" value={props.reason} /> */}
          <input type="hidden" name="location" value={props.location} />
          <input type="hidden" name="selectedDays" value={props.selectedDays} />

          <Button type="submit" disabled={sending}>
            <Trans>Send request</Trans>{' '}
            <GoArrowRight className={goArrowRight} />
          </Button>
        </form>
      </div>
      <div className={spacingButton}>
        <BottomContainer>
          <ReportButton />
        </BottomContainer>
      </div>
    </div>
  )
}

SubmissionForm.propTypes = {
  //  fullName: PropTypes.string,
  paperFileNumber: PropTypes.string,
  familyCheck: PropTypes.array,
  familyOption: PropTypes.array,
  email: PropTypes.string,
  //  emailConfirm:PropTypes.string,
  //  reason: PropTypes.string,
  location: PropTypes.string,
  //  explanation: PropTypes.string,
  selectedDays: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  //  availabilityExplanation: PropTypes.string,
  sending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default SubmissionForm
