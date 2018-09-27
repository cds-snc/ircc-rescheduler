import React from 'react'
import PropTypes from 'prop-types'
import { theme, BottomContainer } from '../../styles'
import CancelButton from '../../components/CancelButton'
import Reminder from '../../components/Reminder'
import styled from 'react-emotion'
import { Trans } from '@lingui/react'

const CalReminder = styled(Reminder)`
  padding: ${theme.spacing.md} 0;
`

export const CalBottom = ({ availability, submit }) => {
  return (
    <div>
      <div>
        {!availability && (
          <CalReminder>
            <Trans>
              Make sure you stay available on all of the days you select.
            </Trans>
          </CalReminder>
        )}
      </div>
      <BottomContainer>
        {submit()}
        <CancelButton />
      </BottomContainer>
    </div>
  )
}

CalBottom.propTypes = {
  availability: PropTypes.bool,
  submit: PropTypes.func,
}
