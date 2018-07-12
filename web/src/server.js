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
import { getMailer, getEmailParms, sendMail } from './email/sendmail'

// eslint-disable-next-line security/detect-non-literal-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST ||
  path.join(process.cwd(), 'build', 'assets.json'))

const server = express()
let helmet = require('helmet')

const handleMailError = e => {
  console.log(e.message)
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
    input.selectedDays = input.selectedDays.split(',')

    const validateReg = new Validator(input, RegistrationFields)
    const validateCal = new Validator(input, CalendarFields)

    if (!validateReg.passes()) {
      return res.json({ success: validateReg.errors })
    }

    if (!validateCal.passes()) {
      return res.json({ success: validateReg.errors })
    }

    try {
      let staffResponse = { messageId: null }
      let applicantResponse = { messageId: null }

      const mailer = await getMailer()
      const params = await getEmailParms(input)

      staffResponse = await sendMail(mailer, params.staffParams).catch(
        handleMailError,
      )
      applicantResponse = await sendMail(mailer, params.applicantParams).catch(
        handleMailError,
      )

      if (
        staffResponse.messageId === null &&
        applicantResponse.messageId === null
      ) {
        //both emails failed to send
        return res.redirect('/request-issue/2')
      }

      if (staffResponse.messageId === null) {
        return res.redirect('/request-issue/1')
      }

      if (applicantResponse.messageId === null) {
        return res.redirect('/confirmation/client-request-issue')
      }
    } catch (e) {
      console.log(e)
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
      // eslint-disable-next-line no-console
      console.log(error.message, error.stack)
      res.redirect('/error')
    }
  })

export default server
