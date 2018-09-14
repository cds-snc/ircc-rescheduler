import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { theme, mediaQuery, H2 } from '../styles'
import { Trans, withI18n } from '@lingui/react'
import { SelectedDayList } from './SelectedDayList'
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
`

const SummaryBodyWhiteSpace = styled(SummaryBody)`
  white-space: pre-line;
`

const SummaryLink = styled.div`
  position: absolute;
  bottom: ${theme.spacing.md};
  right: 0;
  width: 6em;
  text-align: right;
`

const SummaryLinkExplanation = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: 0;
  width: 6em;
  text-align: right;
`

const SummaryH2 = styled(H2)`
  margin-bottom: ${theme.spacing.sm};
`
export const SummaryRow = ({
  summaryHeader,
  summaryBody,
  summaryLink,
  summaryLabel,
}) => (
  <Row>
    <SummaryHeader>
      <SummaryH2>{summaryHeader}</SummaryH2>
      {summaryLink === '/register#familyOption-label' ||
      '/explanation#explanationPage-label' ? (
        <SummaryBodyWhiteSpace>{summaryBody}</SummaryBodyWhiteSpace>
      ) : (
        <SummaryBody>{summaryBody}</SummaryBody>
      )}
    </SummaryHeader>
    {summaryLink === '/register#explanation-label' ||
    summaryLink === '/explanation#explanationPage-label' ? (
      <SummaryLinkExplanation>
        <NavLink to={summaryLink} aria-label={summaryLabel}>
          <Trans>Change</Trans>
        </NavLink>
      </SummaryLinkExplanation>
    ) : (
      <SummaryLink>
        <NavLink to={summaryLink} aria-label={summaryLabel}>
          <Trans>Change</Trans>
        </NavLink>
      </SummaryLink>
    )}
  </Row>
)
SummaryRow.propTypes = {
  summaryHeader: PropTypes.object.isRequired,
  summaryBody: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  summaryLink: PropTypes.string.isRequired,
  summaryLabel: PropTypes.string,
}

const Summary = ({
  fullName,
  paperFileNumber,
  familyOption,
  email,
  reason,
  explanation,
  availabilityExplanation,
  selectedDays,
  i18n,
}) => (
  <TableContainer>
    <SummaryRow
      summaryHeader={<Trans>Full name</Trans>}
      summaryBody={fullName}
      summaryLink={'/register#fullName-label'}
      summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Full name')}`}
    />
    <SummaryRow
      summaryHeader={<Trans>Email</Trans>}
      summaryBody={email}
      summaryLink={'/register#email-label'}
      summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Email')}`}
    />
    <SummaryRow
      summaryHeader={<Trans>Paper file number</Trans>}
      summaryBody={paperFileNumber}
      summaryLink={'/register#paperFileNumber-label'}
      summaryLabel={
        i18n && `${i18n._('Change')} ${i18n._('Paper file number')}`
      }
    />
    {familyOption && (
      <SummaryRow
        className="test"
        summaryHeader={<Trans>Family members</Trans>}
        summaryBody={familyOption}
        summaryLink={'/register#familyOption-label'}
        summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Family members')}`}
      />
    )}
    <SummaryRow
      summaryHeader={<Trans>Reason</Trans>}
      summaryBody={reason}
      summaryLink={'/register#reason-header'}
      summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Reason')}`}
    />
    <SummaryRow
      summaryHeader={<Trans>Explanation</Trans>}
      summaryBody={explanation}
      summaryLink={'/register#explanation-label'}
      summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Explanation')}`}
    />

    {!availabilityExplanation ? (
      <SummaryRow
        summaryHeader={<Trans>Availability</Trans>}
        summaryBody={<SelectedDayList selectedDays={selectedDays} />}
        summaryLink={'/calendar#calendar-header'}
        summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Availability')}`}
      />
    ) : (
      <SummaryRow
        summaryHeader={<Trans>Availability</Trans>}
        summaryBody={availabilityExplanation}
        summaryLink={'/explanation#explanationPage-label'}
        summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Availability')}`}
      />
    )}
  </TableContainer>
)

Summary.propTypes = {
  fullName: PropTypes.string,
  paperFileNumber: PropTypes.string,
  familyOption: PropTypes.string,
  email: PropTypes.string,
  reason: PropTypes.object,
  explanation: PropTypes.string,
  selectedDays: PropTypes.array,
  availabilityExplanation: PropTypes.string,
  i18n: PropTypes.object,
}

const SummaryI18n = withI18n()(Summary)

export { SummaryI18n as default, SelectedDayList }
