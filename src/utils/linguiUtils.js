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
   { value:"Alberta", name:"Alberta" },
   { value:"British Columbia", name:"British Columbia" },
   { value:"Manitoba", name:"Manitoba" },
   { value:"New Brunswick", name:"New Brunswick" },
   { value:"Newfoundland and Labrador", name:"Newfoundland and Labrador" },
   { value:"Northwest Territories", name:"Northwest Territories" },
   { value:"Nova Scotia", name:"Nova Scotia" },
   { value:"Nunavut", name:"Nunavut" },
   { value:"Ontario", name:"Ontario" },
   { value:"Prince Edward Island", name:"Prince Edward Island" },
   { value:"Quebec", name:"Quebec" },
   { value:"Saskatchewan", name:"Saskatchewan" },
   { value:"Yukon", name:"Yukon" },
 ]

export const provinceNamesFr = [
  { value:"Alberta", name:"Alberta" },
  { value:"British Columbia", name:"Colombie-Britannique" },
  { value:"Prince Edward Island", name:"Île-du-Prince-Édouard" },
  { value:"Manitoba", name:"Manitoba" },
  { value:"New Brunswick", name:"Nouveau-Brunswick" },
  { value:"Nova Scotia", name:"Nouvelle-Écosse" },
  { value:"Nunavut", name:"Nunavut" },
  { value:"Ontario", name:"Ontario" },
  { value:"Quebec", name:"Québec" },
  { value:"Saskatchewan", name:"Saskatchewan" },
  { value:"Newfoundland and Labrador", name:"Terre-Neuve-et-Labrador" },
  { value:"Northwest Territories", name:"Territoires du Nord-Ouest" },
  { value:"Yukon", name:"Yukon" },
]

