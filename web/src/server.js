import express from 'express'
import cookieParser from 'cookie-parser'
import { SECRET, getStoreCookie } from './cookies'
import { render } from '@jaredpalmer/after'
import { renderToString } from 'react-dom/server'
import routes from './routes'
import Document from './Document'
import path from 'path'
import { renderStylesToString } from 'emotion-server'
import bodyParser from 'body-parser'
import { CalendarFields, RegistrationFields } from './validation'
import Validator from 'validatorjs'
import {
  getMailer,
  getEmailParms,
  cleanDates,
  sendMail,
} from './email/sendmail'
import gitHash from './utils/gitHash'
import Raven from 'raven'
Raven.config('https://a2315885b9c3429a918336c1324afa4a@sentry.io/1241616', {
  dataCallback: function(data) {
    var stacktrace = data.exception && data.exception[0].stacktrace

    if (stacktrace && stacktrace.frames) {
      stacktrace.frames.forEach(function(frame) {
        if (frame.filename.startsWith('/')) {
          frame.filename = 'app:///' + path.basename(frame.filename)
        }
      })
    }

    return data
  },
  release:
    typeof process.env.RAZZLE_STAGE === typeof undefined
      ? ''
      : `${process.env.RAZZLE_STAGE}-${gitHash()}`,
}).install()

// eslint-disable-next-line security/detect-non-literal-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST ||
  path.join(process.cwd(), 'build', 'assets.json'))

const server = express()
let helmet = require('helmet')

const handleMailError = e => {
  Raven.captureException(e)

  // eslint-disable-line no-console
  return {
    messageId: null,
    errorMessage: e.message,
  }
}

server
  .use(helmet.frameguard({ action: 'deny' })) //// Sets "X-Frame-Options: DENY".
  .use(helmet.noSniff()) // Sets "X-Content-Type-Options: nosniff".
  .use(helmet.noCache()) // Set Cache-Control, Surrogate-Control, Pragma, and Expires to no.
  .use(helmet.xssFilter()) // Sets "X-XSS-Protection: 1; mode=block".
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || './public'))
  .use(cookieParser(SECRET))
  .use(bodyParser.urlencoded({ extended: false }))
  .post('/submit', async (req, res) => {
    let input = Object.assign({}, req.body) // make a new object
    input.selectedDays = cleanDates(input.selectedDays)

    const validateReg = new Validator(input, RegistrationFields)
    const validateCal = new Validator(input, CalendarFields)

    if (!validateReg.passes()) {
      return res.redirect('/register')
    }

    if (!validateCal.passes()) {
      return res.redirect('/calendar')
    }

    try {
      let staffResponse = { messageId: null }
      let applicantResponse = { messageId: null }

      const mailer = await getMailer()
      const params = await getEmailParms(input)

      staffResponse = await sendMail(mailer, params.staffParams).catch(
        handleMailError,
      )

      if (staffResponse.messageId) {
        // send applicant email only if staff email was sent
        applicantResponse = await sendMail(
          mailer,
          params.applicantParams,
        ).catch(handleMailError)
      }

      if (
        staffResponse.messageId === null &&
        applicantResponse.messageId === null
      ) {
        // both emails failed to send
        return res.redirect('/error')
      }

      if (staffResponse.messageId === null) {
        // staff email failed send user to error page
        return res.redirect('/error')
      }

      if (applicantResponse.messageId === null) {
        // staff email send but applicant email didn't
        return res.redirect('/confirmation/client-request-issue')
      }
    } catch (e) {
      console.log(e) // eslint-disable-line no-console
      return res.redirect('/error')
    }

    return res.redirect('/confirmation')
  })
  .get('/clear', (req, res) => {
    let language = getStoreCookie(req.cookies, 'language') || 'en'

    res.clearCookie('store')
    res.redirect(`/cancel?language=${language}`)
  })
  .get('/*', async (req, res) => {
    const customRenderer = node => ({
      gitHashString: gitHash(),
      path: req.url,
      html: renderStylesToString(renderToString(node)),
    })
    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        customRenderer,
        document: Document,
      })

      return res.locals.redirect
        ? res.redirect(res.locals.redirect)
        : res.send(html)
    } catch (error) {
      console.log(error.message, error.stack) // eslint-disable-line no-console
      res.redirect('/error')
    }
  })

export default server
