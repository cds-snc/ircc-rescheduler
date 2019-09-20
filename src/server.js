import express from 'express'
import http from 'http'
import cookieParser from 'cookie-parser'
import { getStoreCookie } from './cookies'
import { render } from '@jaredpalmer/after'
import { renderToString } from 'react-dom/server'
import routes from './routes'
import Document from './Document'
import path from 'path'
import { renderStylesToString } from 'emotion-server'
import bodyParser from 'body-parser'
import {
  getPrimarySubdomain,
  ensureLocation,
  setRavenContext,
  cspConfig,
} from './utils/serverUtils'
import gitHash from './utils/gitHash'

// eslint-disable-next-line security/detect-non-literal-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST ||
  path.join(process.cwd(), 'build', 'assets.json'))

const apiHost = process.env.CONNECTION_STRING

const server = express()
const helmet = require('helmet')

server
  .use(helmet()) // sets security-focused headers: https://helmetjs.github.io/
  .use(helmet.frameguard({ action: 'deny' })) // Sets "X-Frame-Options: DENY".
  .use(helmet.contentSecurityPolicy({ directives: cspConfig }))
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || './public'))
  .use(getPrimarySubdomain)
  .use(setRavenContext)
  .use(ensureLocation)
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: false }))
  // Endpoint for calling SAB database API
  .get('/locations', (req, res) => {
    let data = ''
    fetch(`http://${apiHost}/locationsbyprov/Ontario`)
      .then(response => response.json())
      .then(chunk => {
        console.log(`STATUS: ${resp.statusCode}`)
        console.log(`HEADERS: ${JSON.stringify(resp.headers)}`)
        console.log(`BODY: ${chunk}`)
        res.status(200).send(chunk)
      })
      .catch(err => {
        console.log(
          'Something went wrong when calling the API. Heres the error: ' + err,
        )
      })
  })
  .get('/clear', (req, res) => {
    let language = getStoreCookie(req.cookies, 'language') || 'en'
    res.clearCookie('store')
    res.redirect(`/cancel?language=${language}`)
  })
  .all('/*', async (req, res) => {
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
