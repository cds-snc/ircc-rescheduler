import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { theme, mediaQuery, H2 } from '../styles'
import { Trans } from 'lingui-react'
import Time from './Time'
import { NavLink } from 'react-router-dom'

const TableContainer = styled.div`
  margin: ${theme.spacing.lg} 0;

  h2 {
    font-size: ${theme.font.md};
    margin-top: 0;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid ${theme.colour.greyLight};
  padding-top: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.md};
  ${mediaQuery.sm(css`
    display: block;
  `)};

  li {
    padding-bottom: 0;
    margin-bottom: ${theme.spacing.xs};
  }
`

const Column1 = styled.div`
  width: 100%;
`

const Column2 = styled.div`
  width: 80%;
  margin-top: ${theme.spacing.sm};

  ${mediaQuery.sm(css`
    width: 100%;
  `)};
`

const Column3 = styled.div`
  position: absolute;
  bottom: ${theme.spacing.md};
  right: 0;
  width: 6em;
  text-align: right;

  ${mediaQuery.sm(css`
    position: static;
    margin-top: ${theme.spacing.md};
    text-align: left;
  `)};
`

const SelectedDayList = ({ selectedDays }) => {
  return selectedDays && selectedDays.length > 0 ? (
    <ul>
      {selectedDays.map((day, index) => (
        <li key={index}>
          <Time date={day} />
        </li>
      ))}
    </ul>
  ) : (
    <span className="no-dates-selected">
      <Trans>No dates selected</Trans>
    </span>
  )
}
SelectedDayList.propTypes = {
  selectedDays: PropTypes.array,
}

const SummaryRow = ({ firstColumn, secondColumn, thirdColumn }) => (
  <Row>
    <Column1>
      <H2>{firstColumn}</H2>
      <Column2>{secondColumn}</Column2>
    </Column1>

    <Column3>
      <NavLink to={thirdColumn}>
        <Trans>Change</Trans>
      </NavLink>
    </Column3>
  </Row>
)
SummaryRow.propTypes = {
  firstColumn: PropTypes.object.isRequired,
  secondColumn: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  thirdColumn: PropTypes.string.isRequired,
}

const Summary = ({
  fullName,
  paperFileNumber,
  reason,
  explanation,
  selectedDays,
}) => (
  <TableContainer>
    <SummaryRow
      firstColumn={<Trans>Full name</Trans>}
      secondColumn={fullName}
      thirdColumn={'/register'}
    />
    <SummaryRow
      firstColumn={<Trans>Paper file number</Trans>}
      secondColumn={paperFileNumber}
      thirdColumn={'/register'}
    />
    <SummaryRow
      firstColumn={<Trans>Reason</Trans>}
      secondColumn={reason}
      thirdColumn={'/register'}
    />
    <SummaryRow
      firstColumn={<Trans>Explanation</Trans>}
      secondColumn={explanation}
      thirdColumn={'/register'}
    />
    <SummaryRow
      firstColumn={<Trans>Availability</Trans>}
      secondColumn={<SelectedDayList selectedDays={selectedDays} />}
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

export { Summary as default, SelectedDayList }
