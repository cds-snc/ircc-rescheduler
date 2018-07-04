import React from 'react'
import { Trans } from 'lingui-react'

// import 'babel-polyfill'
import { unpackCatalog } from 'lingui-i18n'
import en from '../../locale/en/messages.js'
import fr from '../../locale/fr/messages.js'

export const catalogs = { en: unpackCatalog(en), fr: unpackCatalog(fr) }

// required in development only (huge dependency)
export const linguiDev =
  process.env.NODE_ENV !== 'production' ? require('lingui-i18n/dev') : undefined

/*
  Helper method that checks to see if the i18n object is null or not, since it ends up being null
  if the user refreshes the page. Returns the original text (i18n.t doesnt work and returns english) otherwise.
  The reason we have to sometimes use this method over say the <Trans> tag is that we need the text to be a string at compile time
  */
export const translateText = (i18n, text) => {
  const translation = i18n === undefined ? text : i18n._(text)
  return translation
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
    <Trans>
      https://docs.google.com/forms/d/e/1FAIpQLSdEF3D7QCZ1ecPVKdqz_-dQAvlVdwdCQtHHLzg_v2q5q7XBlg/viewform
    </Trans>
    <Trans>Important message</Trans>
  </React.Fragment>
)

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
