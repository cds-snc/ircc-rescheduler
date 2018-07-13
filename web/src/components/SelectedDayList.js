import React from 'react'
import PropTypes from 'prop-types'
import Time from './Time'
import { Trans, withI18n } from 'lingui-react'

export const SelectedDayList = withI18n()(({ i18n, selectedDays }) => {
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
