const inlineCss = require('inline-css')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

// add newlines formatting plain and html emails
function datesMarkup(dates, newline) {
  const arr = dates.map(date => {
    return `${date} ${newline}`
  })

  return arr.join('')
}

// form values are in 2018-06-26 format
function humanReadable(dates) {
  return dates.map(date =>
    new Date(date).toLocaleDateString('en-CA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  )
}

// retrieve html markup as a string
const readFileContent = async filename => {
  const file = path.resolve(
    __dirname,
    `./email/email_templates/${filename}.html`,
  )
  const content = await readFile(file, 'utf-8').catch(e => {
    console.log(e.message)
    return ''
  })
  return content
}

function getWordmarkPath() {
  return path.resolve(__dirname, './email/email_templates')
}

// build a dynamic template literal in the proper context
// standard template literals can't be dynamic / built at runtime

/* eslint-disable no-new-func */
const fillTemplate = function(template, params) {
  const names = Object.keys(params)
  const vals = Object.keys(params).map(key => params[key])
  return new Function(...names, `return \`${template}\`;`)(...vals)
}

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

export const buildParams = async options => {
  const { selectedDays } = options.formValues

  // add line breaks to dates available
  options.formValues.datesHtml = datesMarkup(
    humanReadable(selectedDays),
    '<br>',
  )
  options.formValues.datesPlain = datesMarkup(
    humanReadable(selectedDays),
    '\r\n',
  )

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
