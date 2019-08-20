import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { theme } from '../styles'
import { Trans, withI18n } from '@lingui/react'
import { SelectedDayList } from './SelectedDayList'
import { SummaryRow, TextAreaSummaryRow } from './SummaryRow'


const TableContainer = styled.div`
  margin: ${theme.spacing.lg} 0;

  h2 {
    font-size: ${theme.font.md};
    margin-top: 0;
  }
`

const Summary = ({
  fullName,
  paperFileNumber,
  familyOption,
  email,
  emailConfirm,
  reason,
  explanation,
  location,
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
      summaryBody={emailConfirm}
      summaryLink={'/register#emailConfirm-label'}
      summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Email')}`}
    />
    <SummaryRow
      summaryHeader={<Trans>Email</Trans>}
      summaryBody={email}
      summaryLink={'/register#emailConfirm-label'}
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
      <TextAreaSummaryRow
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
      summaryHeader={<Trans>Location</Trans>}
      summaryBody={location}
      summaryLink={'/selectProvince'}
      summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Location')}`}
    />
    <TextAreaSummaryRow
      summaryHeader={<Trans>Explanation</Trans>}
      summaryBody={explanation}
      summaryLink={'/register#explanation-label'}
      summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Explanation')}`}
    />

    {!availabilityExplanation ? (
      <SummaryRow
        summaryHeader={<Trans>Availability</Trans>}
        summaryBody={<SelectedDayList selectedDays={selectedDays} />}
        summaryLink={'/calendar#selectedDaysBox'}
        summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Availability')}`}
      />
    ) : (
      <TextAreaSummaryRow
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
  emailConfirm: PropTypes.string,
  reason: PropTypes.object,
  location: PropTypes.string,
  explanation: PropTypes.string,
  selectedDays: PropTypes.array,
  availabilityExplanation: PropTypes.string,
  i18n: PropTypes.object,
}

const SummaryI18n = withI18n()(Summary)

export { SummaryI18n as default, SelectedDayList }
