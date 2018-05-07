import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { theme, mediaQuery, H2, Row, Column1, Column2, Column3 } from './styles'
import { Trans } from 'lingui-react'
import Time from './Time'
import { NavLink } from 'react-router-dom'

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

const SummaryRow = ({ header, secondColumn, thirdColumn }) => (
  <Row>
    <Column1>
      <H2>{header}</H2>
    </Column1>
    <Column2>{secondColumn}</Column2>
    <Column3>
      <NavLink to={thirdColumn}>
        <Trans>Change</Trans>
      </NavLink>
    </Column3>
  </Row>
)

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

SummaryRow.propTypes = {
  header: PropTypes.object.isRequired,
  secondColumn: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  thirdColumn: PropTypes.string.isRequired,
}
