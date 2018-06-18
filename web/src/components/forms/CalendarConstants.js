export const getDateInfo = i18n => {
  //dates need to be arrays of strings (react day picker proptype)
  const date = {
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
  return date
}

/*export const CalendarConstants = withI18n()(({ i18n, language }) => {
  console.log(i18n._`Review`)
})*/
