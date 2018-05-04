import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { theme, mediaQuery } from './styles'
import { Trans } from 'lingui-react'
import Time from './Time'
import { DateRow, UserInfoRow } from './TableContents'

const TableContainer = styled.div`
  width: 80%;
  margin: ${theme.spacing.lg} 0 ${theme.spacing.lg} 0;

  ${mediaQuery.medium(css`
    width: 100%;
  `)};
`

const renderSelectedDays = selectedDays => {
  return selectedDays && selectedDays.length > 0 ? (
    <ul>
      {selectedDays.map((day, index) => (
        <li key={index}>
          <Time date={day} />
        </li>
      ))}
    </ul>
  ) : (
    <p>
      <Trans>No dates selected</Trans>
    </p>
  )
}

export const Summary = ({
  fullName,
  paperFileNumber,
  reason,
  explanation,
  selectedDays,
}) => (
  <TableContainer>
    <UserInfoRow
      header="Full name"
      secondColumn={fullName}
      thirdColumn="Edit"
    />
    <UserInfoRow
      header="Paper file number"
      secondColumn={paperFileNumber}
      thirdColumn="Edit"
    />
    <UserInfoRow header="Reason" secondColumn={reason} thirdColumn="Edit" />
    <UserInfoRow
      header="Explanation"
      secondColumn={explanation}
      thirdColumn="Edit"
    />
    <DateRow
      header="Availability"
      secondColumn={renderSelectedDays(selectedDays)}
      thirdColumn="Change"
    />
  </TableContainer>
)

Summary.propTypes = {
  fullName: PropTypes.string,
  reason: PropTypes.object,
  explanation: PropTypes.string,
  paperFileNumber: PropTypes.string,
  selectedDays: PropTypes.array,
}
