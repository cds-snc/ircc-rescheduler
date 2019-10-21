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
import { handleSubmitEmail } from './email/handleSubmitEmail'
import { logError, logDebug } from './utils/logger'
checkEnvironmentVariables()
// eslint-disable-next-line security/detect-non-literal-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST ||
  path.join(process.cwd(), 'build', 'assets.json'))
const server = express()
const helmet = require('helmet')
const apiHost = process.env.CONNECTION_STRING
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
  .use(bodyParser.json())
  .post('/submit', handleSubmitEmail)
  .get('/locations/:province', (req, res) => {
    let data = ''
    let province = req.params.province
    http
      .get(`${apiHost}/locationsbyprov/${province}`, resp => {
        logDebug(`STATUS: ${resp.statusCode}`)
        logDebug(`HEADERS: ${JSON.stringify(resp.headers)}`)
        resp.on('data', chunk => {
          data += chunk
        })
        resp.on('end', function() {
          res.status(200).send(data)
        })
      })
      .on('error', err => {
        logError(
          'Something went wrong when calling the API in locations/province: ' +
            err.message,
        )
        res.status(503).send()
      })
  })
  .get('/locations/:province/:city', (req, res) => {
    let data = ''
    let province = req.params.province
    let city = req.params.city || ''
    http
      .get(`${apiHost}/locationsbyprov/${province}/${city}`, resp => {
        logDebug(`STATUS: ${resp.statusCode}`)
        logDebug(`HEADERS: ${JSON.stringify(resp.headers)}`)
        resp.on('data', chunk => {
          data += chunk
        })
        resp.on('end', function() {
          res.status(200).send(data)
        })
      })
      .on('error', err => {
        logError(
          'Something went wrong when calling the API in locations/province/city: ' +
            err.message,
        )
        res.status(503).send()
      })
  })
  .get('/appointments/:locationID', (req, res) => {
    let data = ''
    let locationID = req.params.locationID
    let day = req.query.day
    http
      .get(`${apiHost}/appointments/${locationID}?day=${day}`, resp => {
        logDebug(`STATUS: ${resp.statusCode}`)
        logDebug(`HEADERS: ${JSON.stringify(resp.headers)}`)
        resp.on('data', chunk => {
          data += chunk
        })
        resp.on('end', function() {
          res.status(200).send(data)
        })
      })
      .on('error', err => {
        logError(
          'Something went wrong when calling the API appointments/locationID/city:  ' +
            err.message,
        )
        res.status(503).send()
      })
  })

  .get('/appointments/:confirm/:documentId', (req, res) => {
    let data = ''
    let documentId = req.params.documentId

    http
      .get(`${apiHost}/appointments/confirm/${documentId}`, resp => {
        logDebug(`STATUS: ${resp.statusCode}`)
        logDebug(`HEADERS: ${JSON.stringify(resp.headers)}`)
        resp.on('data', chunk => {
          data += chunk
          res.status(200).send(data)
        })
      })
      .on('error', err => {
        logError(
          'Something went wrong when calling the API appointments/locationID/city:  ' +
          err.message,
       )
       res.status(503).send()
     })
 })
  .get('/appointments/timeslots/:locationId', (req, res) => {
    let locationId = req.params.locationId
    let day = req.query.day
    let accessible = req.query.accessible
    let data = ''
    http
      .get(
        `${apiHost}/appointments/timeslots/${locationId}?day=${day}&accessible=${accessible}`,
        resp => {
          logDebug(`STATUS: ${resp.statusCode}`)
          logDebug(`HEADERS: ${JSON.stringify(resp.headers)}`)
          resp.on('data', chunk => {
            data += chunk
            res.status(200).send(data)
          })
        },
      )
      .on('error', err => {
        logError(
          'Something went wrong when calling the API appointments/timeslots:  ' +
            err.message,
        )
        res.status(503).send()
      })
  })

  .post('/appointments/temp', (req, res) => {
    let data = JSON.stringify(req.body)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    }
    let postReq = http
      .request(`${apiHost}/appointments/temp`, options, resp => {
        logDebug(`STATUS: ${resp.statusCode}`)
        logDebug(`HEADERS: ${JSON.stringify(resp.headers)}`)
        resp.on('data', respData => {
          res.status(200).send(respData)
        })
      })
      .on('error', err => {
        logError(
          'Something went wrong when calling the API appointments/temp:  ' +
            err.message,
        )
        res.status(503).send()
      })
    postReq.write(data)
    postReq.end()
  })
  .delete('/appointments/temp/delete/:documentId', (req, res) => {
    let id = req.params.documentId
    let options
    let domain
    let data = ''
    if (apiHost.startsWith('http://localhost')) {
      domain = apiHost.slice(7, 16)
      let port = apiHost.slice(17)
      options = {
        method: 'DELETE',
        hostname: domain,
        port: port,
        path: `/appointments/temp/delete/${id}`,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
        },
      }
    } else {
      domain = apiHost.slice(7)
      options = {
        method: 'DELETE',
        hostname: domain,
        path: `/appointments/temp/delete/${id}`,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
        },
      }
    }
    let deleteReq = http.request(options, resp => {
      logDebug(`STATUS: ${resp.statusCode}`)
      logDebug(`HEADERS: ${JSON.stringify(resp.headers)}`)
      resp.on('data', chunk => {
        data += chunk
        res.status(200).send(data)
      })
    })
    deleteReq.on('error', err => {
      logError(
        'Something went wrong when calling the API appointments/temp/delete:  ' +
          err.message,
      )
      res.status(503).send()
    })
    deleteReq.write(data)
    deleteReq.end()
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
      return
    }
  })
export default server
function checkEnvironmentVariables() {
  if (process.env.SKIP_SECRET_CHECK !== 'TRUE') {
    const key = process.env.NOTIFICATION_API_KEY
    if (key === '' || typeof key === 'undefined') {
      throw 'NOTIFICATION_API_KEY environment variable not found'
    }
  }
  const baseUrl = process.env.NOTIFICATION_API_BASE_URL
  if (baseUrl === '' || typeof baseUrl === 'undefined') {
    throw 'NOTIFICATION_API_BASE_URL environment variable not found'
  }
}
