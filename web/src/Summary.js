import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { theme, mediaQuery } from './styles'
import { Trans } from 'lingui-react'
import Time from './Time'
import { SummaryRow } from './TableContents'

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
    <SummaryRow
      header={<Trans>Full name</Trans>}
      secondColumn={fullName}
      thirdColumn={'/register'}
    />
    <SummaryRow
      header={<Trans>Paper file number</Trans>}
      secondColumn={paperFileNumber}
      thirdColumn={'/register'}
    />
    <SummaryRow
      header={<Trans>Reason</Trans>}
      secondColumn={reason}
      thirdColumn={'/register'}
    />
    <SummaryRow
      header={<Trans>Explanation</Trans>}
      secondColumn={explanation}
      thirdColumn={'/register'}
    />
    <SummaryRow
      header={<Trans>Availability</Trans>}
      secondColumn={renderSelectedDays(selectedDays)}
      thirdColumn={'/calendar'}
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
