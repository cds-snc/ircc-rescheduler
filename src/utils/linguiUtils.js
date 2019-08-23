// import 'babel-polyfill'
import en from '../../locale/en/messages.js'
import fr from '../../locale/fr/messages.js'

export const catalogs = { en, fr }

export const getDateInfo = i18n => {
  let dateInfo = {}
  if (i18n) {
    //dates need to be arrays of strings (react day picker proptype)
    dateInfo = {
      months: [
        i18n._('January'),
        i18n._('February'),
        i18n._('March'),
        i18n._('April'),
        i18n._('May'),
        i18n._('June'),
        i18n._('July'),
        i18n._('August'),
        i18n._('September'),
        i18n._('October'),
        i18n._('November'),
        i18n._('December'),
      ],
      weekdaysLong: [
        i18n._('Sunday'),
        i18n._('Monday'),
        i18n._('Tuesday'),
        i18n._('Wednesday'),
        i18n._('Thursday'),
        i18n._('Friday'),
        i18n._('Saturday'),
      ],
      weekdaysShort: [
        i18n._('Su'),
        i18n._('Mo'),
        i18n._('Tu'),
        i18n._('We'),
        i18n._('Thu'),
        i18n._('Fri'),
        i18n._('Sat'),
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

export const provinceNames = [
// { _id:0, idfr:0, name:"Select a Province", namefr:"Sélectionnez une province" },
   { _id:1, name:"Alberta" },
   { _id:2, name:"British Columbia" },
   { _id:3, name:"Manitoba" },
   { _id:4, name:"New Brunswick" },
   { _id:5, name:"Newfoundland and Labrador" },
   { _id:6, name:"Northwest Territories" },
   { _id:7, name:"Nova Scotia" },
   { _id:8, name:"Nunavut" },
   { _id:9, name:"Ontario" },
   { _id:10, name:"Prince Edward Island" },
   { _id:11, name:"Quebec" },
   { _id:12, name:"Saskatchewan" },
   { _id:13, name:"Yukon", namefr:"Yukon" },
 ]

export const provinceNamesFr = [
  // { _id:0, idfr:0, name:"Select a Province", namefr:"Sélectionnez une province" },
  { _id:1, name:"Alberta" },
  { _id:2, name:"Colombie-Britannique" },
  { _id:3, name:"Île-du-Prince-Édouard" },
  { _id:4, name:"Manitoba" },
  { _id:5, name:"Nouveau-Brunswick" },
  { _id:6, name:"Nouvelle-Écosse" },
  { _id:7, name:"Nunavut" },
  { _id:8, name:"Ontario" },
  { _id:9, name:"Québec" },
  { _id:10, name:"Saskatchewan" },
  { _id:11, name:"Terre-Neuve-et-Labrador" },
  { _id:12, name:"Territoires du Nord-Ouest" },
  { _id:13, name:"Yukon" },
]

