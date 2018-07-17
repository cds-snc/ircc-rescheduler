import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { theme, mediaQuery, H2 } from '../styles'
import { Trans, withI18n } from 'lingui-react'
import Time from './Time'
import { HashLink as NavLink } from 'react-router-hash-link'

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

  li:last-of-type {
    margin-bottom: 0;
  }
`

const SummaryHeader = styled.div`
  width: 100%;
  margin-bottom: 0;
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

const SummaryH2 = styled(H2)`
  margin-bottom: ${theme.spacing.sm};
`
const SelectedDayList = withI18n()(({ i18n, selectedDays }) => {
  const locale = i18n !== undefined ? i18n._language : 'en'

  return selectedDays && selectedDays.length > 0 ? (
    <ul>
      {selectedDays.map((day, index) => (
        <li key={index}>
          <Time date={day} locale={locale} />
        </li>
      ))}
    </ul>
  ) : (
    <span className="no-dates-selected">
      <Trans>No days selected</Trans>
    </span>
  )
})
SelectedDayList.propTypes = {
  selectedDays: PropTypes.array,
}

const SummaryRow = ({
  summaryHeader,
  summaryBody,
  summaryLink,
  summaryLabel,
}) => (
  <Row>
    <SummaryHeader>
      <SummaryH2>{summaryHeader}</SummaryH2>
      <SummaryBody>{summaryBody}</SummaryBody>
    </SummaryHeader>

    <SummaryLink>
      <NavLink to={summaryLink} aria-label={summaryLabel}>
        <Trans>Change</Trans>
      </NavLink>
    </SummaryLink>
  </Row>
)
SummaryRow.propTypes = {
  summaryHeader: PropTypes.object.isRequired,
  summaryBody: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  summaryLink: PropTypes.string.isRequired,
  summaryLabel: PropTypes.string.isRequired,
}

const Summary = ({
  fullName,
  email,
  paperFileNumber,
  reason,
  explanation,
  selectedDays,
  i18n,
}) => (
  <TableContainer>
    <SummaryRow
      summaryHeader={<Trans>Full name</Trans>}
      summaryBody={fullName}
      summaryLink={'/register#fullName-label'}
      summaryLabel={i18n._('Change Full name')}
    />
    <SummaryRow
      summaryHeader={<Trans>Email</Trans>}
      summaryBody={email}
      summaryLink={'/register#email-label'}
      summaryLabel={i18n._('Change Email')}
    />
    <SummaryRow
      summaryHeader={<Trans>Paper file number</Trans>}
      summaryBody={paperFileNumber}
      summaryLink={'/register#paperFileNumber-label'}
      summaryLabel={i18n._('Change Paper file number')}
    />
    <SummaryRow
      summaryHeader={<Trans>Reason</Trans>}
      summaryBody={reason}
      summaryLink={'/register#reason-header'}
      summaryLabel={i18n._('Change Reason')}
    />
    <SummaryRow
      summaryHeader={<Trans>Explanation</Trans>}
      summaryBody={explanation}
      summaryLink={'/register#explanation-label'}
      summaryLabel={i18n._('Change Explanation')}
    />
    <SummaryRow
      summaryHeader={<Trans>Availability</Trans>}
      summaryBody={<SelectedDayList selectedDays={selectedDays} />}
      summaryLink={'/calendar#calendar-sub-header'}
      summaryLabel={i18n._('Change Availability')}
    />
  </TableContainer>
)

Summary.propTypes = {
  fullName: PropTypes.string,
  email: PropTypes.string,
  reason: PropTypes.object,
  explanation: PropTypes.string,
  paperFileNumber: PropTypes.string,
  selectedDays: PropTypes.array,
}

const SummaryI18n = withI18n()(Summary)

export { SummaryI18n as default, SelectedDayList }
