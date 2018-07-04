import express from 'express'
import cookieParser from 'cookie-parser'
import { SECRET, getStoreCookie } from './cookies'
import { render } from '@jaredpalmer/after'
import { renderToString } from 'react-dom/server'
import routes from './routes'
import createApolloClient from './utils/createApolloClient'
import Document from './Document'
import path from 'path'
import { renderStylesToString } from 'emotion-server'
import bodyParser from 'body-parser'
import { SUBMIT } from './queries'

// eslint-disable-next-line security/detect-non-literal-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST ||
  path.join(process.cwd(), 'build', 'assets.json'))

const server = express()
const client = createApolloClient({
  ssrMode: true,
  uri: 'https://rescheduler.cds-snc.ca',
})
let helmet = require('helmet')

server
  .use(helmet.frameguard({ action: 'deny' })) //// Sets "X-Frame-Options: DENY".
  .use(helmet.noSniff()) // Sets "X-Content-Type-Options: nosniff".
  .use(helmet.noCache()) // Set Cache-Control, Surrogate-Control, Pragma, and Expires to no.
  .use(helmet.xssFilter()) // Sets "X-XSS-Protection: 1; mode=block".
  .disable('x-powered-by')
  .use(express.static('./public'))
  .use(cookieParser(SECRET))
  .use(bodyParser.urlencoded({ extended: false }))
  .post('/submit', async (req, res) => {
    try {
      let data = Object.assign({}, req.body) // make a new object
      data.availability = data.availability.split(',')

      /*
      let data = {
        fullName: 'john li',
        email: 'john@johnliindustries.com',
        paperFileNumber: '123456789'
        reason: 'medical',
        explanation: 'this is a textbox field with a bunch of freely-formatted text',
        availability: ['2018-09-05', '2018-09-06', '2018-09-12']
      }
      */

      // eslint-disable-next-line no-unused-vars
      const response = await client.mutate({
        mutation: SUBMIT,
        variables: data,
      })

      /*
      TODO: handle response gracefully
      res.json(response)
      */

      return res.redirect('/confirmation')
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message)
      res.json(e.message)
    }
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
