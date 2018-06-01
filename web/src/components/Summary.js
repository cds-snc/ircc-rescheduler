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

const Column1A = styled.div`
  width: 100%;
`

const Column1B = styled.div`
  width: 80%;
  margin-top: ${theme.spacing.sm};

  ${mediaQuery.sm(css`
    width: 100%;
  `)};
`

const Column2 = styled.div`
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

const SummaryRow = ({ firstColumnA, firstColumnB, secondColumn }) => (
  <Row>
    <Column1A>
      <H2>{firstColumnA}</H2>
      <Column1B>{firstColumnB}</Column1B>
    </Column1A>

    <Column2>
      <NavLink to={secondColumn}>
        <Trans>Change</Trans>
      </NavLink>
    </Column2>
  </Row>
)
SummaryRow.propTypes = {
  firstColumnA: PropTypes.object.isRequired,
  firstColumnB: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  secondColumn: PropTypes.string.isRequired,
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
      firstColumnA={<Trans>Full name</Trans>}
      firstColumnB={fullName}
      secondColumn={'/register'}
    />
    <SummaryRow
      firstColumnA={<Trans>Paper file number</Trans>}
      firstColumnB={paperFileNumber}
      secondColumn={'/register'}
    />
    <SummaryRow
      firstColumnA={<Trans>Reason</Trans>}
      firstColumnB={reason}
      secondColumn={'/register'}
    />
    <SummaryRow
      firstColumnA={<Trans>Explanation</Trans>}
      firstColumnB={explanation}
      secondColumn={'/register'}
    />
    <SummaryRow
      firstColumnA={<Trans>Availability</Trans>}
      firstColumnB={<SelectedDayList selectedDays={selectedDays} />}
      secondColumn={'/calendar'}
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
