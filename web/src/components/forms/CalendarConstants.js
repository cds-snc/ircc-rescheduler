import React from 'react'
import { Trans } from 'lingui-react'

export const getDateInfo = i18n => {
  let dateInfo = {}
  if (i18n) {
    //dates need to be arrays of strings (react day picker proptype)
    dateInfo = {
      months: [
        i18n._`January`,
        i18n._`February`,
        i18n._`March`,
        i18n._`April`,
        i18n._`May`,
        i18n._`June`,
        i18n._`July`,
        i18n._`August`,
        i18n._`September`,
        i18n._`October`,
        i18n._`November`,
        i18n._`December`,
      ],
      weekdaysLong: [
        i18n._`Sunday`,
        i18n._`Monday`,
        i18n._`Tuesday`,
        i18n._`Wednesday`,
        i18n._`Thursday`,
        i18n._`Friday`,
        i18n._`Saturday`,
      ],
      weekdaysShort: [
        i18n._`Su`,
        i18n._`Mo`,
        i18n._`Tu`,
        i18n._`We`,
        i18n._`Thu`,
        i18n._`Fri`,
        i18n._`Sat`,
      ],
    }
  } else {
    dateInfo = {
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      weekdaysLong: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      weekdaysShort: ['Su', 'Mo', 'Tu', 'We', 'Thu', 'Fri', 'Sat'],
    }
  }
  return dateInfo
}

// eslint-disable-next-line no-unused-vars
const translations = () => (
  <React.Fragment>
    <Trans>January</Trans>
    <Trans>February</Trans>
    <Trans>March</Trans>
    <Trans>April</Trans>
    <Trans>May</Trans>
    <Trans>June</Trans>
    <Trans>July</Trans>
    <Trans>August</Trans>
    <Trans>September</Trans>
    <Trans>October</Trans>
    <Trans>November</Trans>
    <Trans>December</Trans>
    <Trans>Sunday</Trans>
    <Trans>Monday</Trans>
    <Trans>Tuesday</Trans>
    <Trans>Wednesday</Trans>
    <Trans>Thursday</Trans>
    <Trans>Friday</Trans>
    <Trans>Saturday</Trans>
    <Trans>Su</Trans>
    <Trans>Mo</Trans>
    <Trans>Tu</Trans>
    <Trans>We</Trans>
    <Trans>Thu</Trans>
    <Trans>Fri</Trans>
    <Trans>Sat</Trans>
    <Trans>https://www.canada.ca/en/transparency/privacy.html</Trans>
    <Trans>https://digital.canada.ca/legal/terms/</Trans>
  </React.Fragment>
)
