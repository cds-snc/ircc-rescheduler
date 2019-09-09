import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { theme } from '../styles'
import { Trans, withI18n } from '@lingui/react'
import { SelectedDayList } from './SelectedDayList'
import { SummaryRow, TextAreaSummaryRow } from './SummaryRow'
//import { SummaryRow, TextAreaSummaryRow } from './SummaryRow'


const TableContainer = styled.div`
  margin: ${theme.spacing.lg} 0;

  h2 {
    font-size: ${theme.font.md};
    margin-top: 0;
  }
`

const Summary = ({
  paperFileNumber,
  email,
  location,
  selectedDays,
  // eslint-disable-next-line react/prop-types
  accessibility,
  // eslint-disable-next-line react/prop-types
  privacy,
  
  // eslint-disable-next-line react/prop-types
  familyOption,
  i18n,
}) => (
  <TableContainer>
    <SummaryRow
      summaryHeader={<Trans>BIL file number</Trans>}
      summaryBody={paperFileNumber}
      summaryLink={'/register#paperFileNumber-label'}
      summaryLabel={
        i18n && `${i18n._('Change')} ${i18n._('Paper file number')}`
      }
    />
    <SummaryRow
      summaryHeader={<Trans>Email</Trans>}
      summaryBody={email}
      summaryLink={'/register#email-label'}
      summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Email')}`}
    />
    <SummaryRow
      summaryHeader={<Trans>Accessibility required</Trans>}
      summaryBody={accessibility}
      summaryLink={'/register#accessibility-label'}
      summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Accessibility')}`}
    /> <SummaryRow
    summaryHeader={<Trans>Privacy booth required</Trans>}
    summaryBody={privacy}
    summaryLink={'/register#privacy-label'}
    summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Privacy')}`}
  />

    <SummaryRow
      summaryHeader={<Trans>Location</Trans>}
      summaryBody={location}
      summaryLink={'/selectProvince'}
      summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Location')}`}
    />
    <SummaryRow
      summaryHeader={<Trans>Availability</Trans>}
      summaryBody={<SelectedDayList selectedDays={selectedDays} />}
      summaryLink={'/calendar#selectedDaysBox'}
      summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Availability')}`}
    />

      {familyOption && (
      <TextAreaSummaryRow
        summaryHeader={<Trans>Family members</Trans>}
        summaryBody={familyOption}
        summaryLink={'/register#familyOption-label'}
        summaryLabel={i18n && `${i18n._('Change')} ${i18n._('Family members')}`}
      />
    )}
  </TableContainer>
)

Summary.propTypes = {
  paperFileNumber: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  selectedDays: PropTypes.array,
  familyOption: PropTypes.string,
  i18n: PropTypes.object,
}

const SummaryI18n = withI18n()(Summary)

export { SummaryI18n as default, SelectedDayList }
