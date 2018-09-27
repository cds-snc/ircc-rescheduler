import { respondByDate } from '../utils/calendarDates'
import { getEmail, getPhone } from '../locations'
const inlineCss = require('inline-css')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readFile = promisify(fs.readFile) // eslint-disable-line security/detect-non-literal-fs-filename
const format = require('date-fns/format')
const locales = {
  fr: require('date-fns/locale/fr'),
}

// add newlines formatting plain and html emails
export function datesMarkup(dates, newline) {
  const arr = dates.map(date => {
    return `${date} ${newline}`
  })

  return arr.join('')
}

// form values are in 2018-06-26 format
/* eslint-disable security/detect-object-injection */
export function humanReadable(dates, locale = 'en') {
  return dates.map(date => {
    return format(date, 'dddd MMMM DD YYYY', {
      locale: locales[locale],
    })
  })
}
/* eslint-enable security/detect-object-injection */

let prefix = '../../'

/*
if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'development'
) {
  prefix += 'web'
}
*/

/*
 when running on heroku, our prefix is different
 if check found here: https://stackoverflow.com/a/28489160/9728185
*/
if (process.env.NODE && ~process.env.NODE.indexOf('heroku')) {
  prefix = '../'
}

// retrieve html markup as a string
const readFileContent = async filename => {
  const file = path.resolve(
    __filename,
    `${prefix}/email_templates/${filename}.html`,
  )
  const content = await readFile(file, 'utf-8').catch(e => {
    return e.message
  })
  return content
}

function getWordmarkPath() {
  return path.resolve(__filename, `${prefix}/email_templates`)
}

// build a dynamic template literal in the proper context
// standard template literals can't be dynamic / built at runtime

/* eslint-disable no-new-func */
/* eslint-disable security/detect-object-injection */
const fillTemplate = function(template, params) {
  const names = Object.keys(params)
  const vals = Object.keys(params).map(key => params[key])
  return new Function(...names, `return \`${template}\`;`)(...vals)
}
/* eslint-enable security/detect-object-injection */

// read content from template and replace param placeholders
const buildMarkup = async options => {
  const { templateName, formValues, url } = options
  const html = await readFileContent(templateName)
  const styled = await inlineCss(html, { url })
  const rendered = await fillTemplate(styled, formValues)
  return rendered
}

const renderMarkup = async options => {
  const { htmlTemplate, plainTemplate, formValues, url } = options
  return Promise.all([
    buildMarkup({
      templateName: htmlTemplate,
      formValues,
      url,
    }),
    buildMarkup({
      templateName: plainTemplate,
      formValues,
      url,
    }),
  ])
}

const renderSelectedDays = options => {
  const selectedDays = options.formValues.selectedDays
  options.formValues.introText =
    'We received your request for a new citizenship appointment.'
  options.formValues.introTextFR =
    'Nous avons reçu votre demande pour un nouveau rendez-vous de citoyenneté.'
  options.formValues.datesLabel = 'These are the days you selected:'
  options.formValues.datesLabelFR =
    'Voici les journées que vous avez sélectionnées:'

  // add line breaks to dates available
  options.formValues.datesHtml = datesMarkup(
    humanReadable(selectedDays),
    '<br>',
  )

  // French HTML Dates
  options.formValues.datesHtmlFR = datesMarkup(
    humanReadable(selectedDays, 'fr'),
    '<br>',
  )

  options.formValues.datesPlain = datesMarkup(
    humanReadable(selectedDays),
    '\r\n',
  )

  // French Plain Dates
  options.formValues.datesPlainFR = datesMarkup(
    humanReadable(selectedDays, 'fr'),
    '\r\n',
  )

  options.formValues.whatHappensNext =
    '<p><abbr title="Immigration, Refugees and Citizenship Canada">IRCC</abbr> will send you a new appointment. You will always be contacted at least 3 weeks before your appointment.</p>'

  options.formValues.whatHappensNextFR =
    '<p><abbr title="Immigration, Réfugiés et Citoyenneté Canada">IRCC</abbr> vous enverrons les détails de votre nouveau rendez-vous. Nous communiquerons avec vous au moins 3 semaines avant votre rendez-vous.</p>'
}

const renderAvailabilityExplanation = options => {
  const availability = options.formValues.availabilityExplanation
  options.formValues.introText =
    'We received your request for a new citizenship appointment extension.'
  options.formValues.introTextFR =
    'Nous avons reçu votre demande pour une nouvelle prolongation de rendez-vous de citoyenneté'
  options.formValues.datesLabel = 'This is what you wrote:'
  options.formValues.datesLabelFR = 'C’est ce que vous avez écrit'
  options.formValues.datesHtml = availability
  options.formValues.datesHtmlFR = availability
  options.formValues.datesPlain = availability
  options.formValues.datesPlainFR = availability

  options.formValues.whatHappensNext =
    '<p>You should plan to attend your existing appointment until we contact you. This may take 1 week.</p>'

  options.formValues.whatHappensNextFR =
    '<p>Vous devriez prévoir assister à votre rendez-vous actuel jusqu’à ce que nous communiquions avec vous. Cela pourrait prendre jusqu’à une semaine.</p>'
}

export const buildParams = async options => {
  const {
    selectedDays,
    availabilityExplanation,
    familyOption,
  } = options.formValues

  options.formValues.respondByDate = respondByDate(selectedDays, 'en')
  options.formValues.respondByDateFR = respondByDate(selectedDays, 'fr')

  // render selected dates or unavailability
  if (availabilityExplanation) {
    renderAvailabilityExplanation(options)
  } else {
    renderSelectedDays(options)
  }

  // if familyOption exists and does not start with ',', prepend a comma and a space
  options.formValues.familyOption =
    familyOption && !familyOption.startsWith(',')
      ? `, ${familyOption}`
      : familyOption

  options.formValues.locationEmail = getEmail()
  options.formValues.locationPhone = getPhone()

  const markup = await new Promise(resolve => {
    renderMarkup(options).then(results => {
      resolve({ html: results[0], plain: results[1] })
    })
  })

  const { receivingAddress, sendingAddress, subject } = options
  const { html, plain } = markup

  const params = {
    from: sendingAddress,
    to: receivingAddress,
    replyTo: sendingAddress,
    subject,
    text: plain,
    html: html,
    attachments: [
      {
        filename: 'CanWordmark.png',
        path: getWordmarkPath() + '/CanWordmark.png',
        cid: 'ircc-wordmark@cds', // same cid value as in the html img src
      },
    ],
  }

  return params
}
