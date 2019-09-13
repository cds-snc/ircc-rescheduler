import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { theme } from '../styles'
import { Trans, withI18n } from '@lingui/react'
import { SelectedDayList } from './SelectedDayList'
import { SummaryRow } from './SummaryRow'


const TableContainer = styled.div`
  margin: ${theme.spacing.lg} 0;

  h2 {
    font-size: ${theme.font.md};
    margin-top: 0;
  }
`

const Review = ({
  paperFileNumber,
  email,
  // eslint-disable-next-line react/prop-types
  accessibility,
  privacy,
  location,
  selectedDays,
  selectedTime,
  i18n,
}) => (
  <TableContainer>
    <SummaryRow
      summaryId={'bilNumber'}
      summaryHeader={<Trans>Application number</Trans>}
      summaryBody={paperFileNumber}
      summaryLink={''}
      summaryLabel={''}
    />
    <SummaryRow
      summaryId={'email'}
      summaryHeader={<Trans>Email</Trans>}
      summaryBody={email}
      summaryLink={''}
      summaryLabel={''}
    />
    <SummaryRow
      summaryId={'a11y'}
      summaryHeader={<Trans>Accessibility required</Trans>}
      summaryBody={accessibility}
      summaryLink={''}
      summaryLabel={''}
    />
    <SummaryRow
      summaryId={'privacy'}
      summaryHeader={<Trans>Privacy booth required</Trans>}
      summaryBody={privacy}
      summaryLink={''}
      summaryLabel={''}
    />
    <SummaryRow
      summaryId={'location'}
      summaryHeader={<Trans>Location</Trans>}
      summaryBody={location}
      summaryLink={''}
      summaryLabel={''}
    />
    <SummaryRow
      summaryId={'time'}
      summaryHeader={<Trans>Time</Trans>}
      summaryBody={selectedTime}
      summaryLink={''}
      summaryLabel={''}
    />    
    <SummaryRow
      summaryId={'date'}
      summaryHeader={<Trans>Date</Trans>}
      summaryBody={<SelectedDayList selectedDays={selectedDays} />}
      summaryLink={''}
      summaryLabel={''}
    />
  </TableContainer>
)

Review.propTypes = {
  paperFileNumber: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  selectedDays: PropTypes.array,
  selectedTime: PropTypes.string,
  i18n: PropTypes.object,
}

const ReviewI18n = withI18n()(Review)

export { ReviewI18n as default, SelectedDayList }
