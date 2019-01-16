import express from 'express'
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
} from './utils/serverUtils'
import { handleSubmitEmail } from './email/handleSubmitEmail'
import gitHash from './utils/gitHash'

// eslint-disable-next-line security/detect-non-literal-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST ||
  path.join(process.cwd(), 'build', 'assets.json'))

const server = express()
const helmet = require('helmet')

server
  .use(helmet.frameguard({ action: 'deny' })) //// Sets "X-Frame-Options: DENY".
  .use(helmet.noSniff()) // Sets "X-Content-Type-Options: nosniff".
  .use(helmet.noCache()) // Set Cache-Control, Surrogate-Control, Pragma, and Expires to no.
  .use(helmet.xssFilter()) // Sets "X-XSS-Protection: 1; mode=block".
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || './public'))
  .use(getPrimarySubdomain)
  .use(setRavenContext)
  .use(ensureLocation)
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: false }))
  .post('/submit', handleSubmitEmail)
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
