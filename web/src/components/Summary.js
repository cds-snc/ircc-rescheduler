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

const SummaryHeader = styled.div`
  width: 100%;
`

const SummaryBody = styled.div`
  width: 80%;
  overflow-wrap: break-word;
  word-wrap: break-word;

  ${mediaQuery.sm(css`
    width: 100%;
  `)};
`

const SummaryLink = styled.div`
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

const SummaryRow = ({ summaryHeader, summaryBody, summaryLink }) => (
  <Row>
    <SummaryHeader>
      <H2>{summaryHeader}</H2>
      <SummaryBody>{summaryBody}</SummaryBody>
    </SummaryHeader>

    <SummaryLink>
      <NavLink to={summaryLink}>
        <Trans>Change</Trans>
      </NavLink>
    </SummaryLink>
  </Row>
)
SummaryRow.propTypes = {
  summaryHeader: PropTypes.object.isRequired,
  summaryBody: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  summaryLink: PropTypes.string.isRequired,
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
      summaryHeader={<Trans>Full name</Trans>}
      summaryBody={fullName}
      summaryLink={'/register'}
    />
    <SummaryRow
      summaryHeader={<Trans>Paper file number</Trans>}
      summaryBody={paperFileNumber}
      summaryLink={'/register'}
    />
    <SummaryRow
      summaryHeader={<Trans>Reason</Trans>}
      summaryBody={reason}
      summaryLink={'/register'}
    />
    <SummaryRow
      summaryHeader={<Trans>Explanation</Trans>}
      summaryBody={explanation}
      summaryLink={'/register'}
    />
    <SummaryRow
      summaryHeader={<Trans>Availability</Trans>}
      summaryBody={<SelectedDayList selectedDays={selectedDays} />}
      summaryLink={'/calendar'}
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
