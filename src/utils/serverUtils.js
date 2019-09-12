import { setGlobalLocation } from '../locations'
import gitHash from './gitHash'
import path from 'path'
import Raven from 'raven'

export const getReleaseHash = () => {
  return typeof process.env.RAZZLE_STAGE === typeof undefined
    ? ''
    : `${process.env.RAZZLE_STAGE}-${gitHash()}`
}

export const handleMailError = e => {
  Raven.captureException(e)

  // eslint-disable-line no-console
  return {
    messageId: null,
    errorMessage: e.message,
  }
}

export const gatherFieldErrors = errObj => {
  const errs = Object.keys(errObj).map(key => {
    return key
  })
  return errs.join(', ')
}

export const captureMessage = (title = '', validate) => {
  const errStr = gatherFieldErrors(validate.errors.errors)
  Raven.captureMessage(`${title} = ${errStr}`, {
    level: 'warning',
  })
}

export const notPageMatch = (url, pageName) => {
  return url.indexOf(pageName) === -1
}

export const getPrimarySubdomain = function(req, res, next) {
  req.subdomain = req.subdomains.slice(-1).pop()

  const protocol = process.env.RAZZLE_IS_HTTP ? 'http' : 'https'

  // handle localhost
  if (!req.subdomain) {
    // default to vancouver
    req.subdomain = 'vancouver'
  }

  if (!notPageMatch(req.path, 'not-found') && !notPageMatch(req.path, '500')) {
    // eslint-disable-next-line no-undef
    Console.log('Invalid Domain' + req.subdomain)
    return res.redirect(
      `${protocol}://${process.env.RAZZLE_SITE_URL}/not-found`,
    )
  }

  next()
}

const _ensureBody = (req, res, next, cb) => {
  if (req.path === '/500') return next()

  try {
    cb()
  } catch (e) {
    Raven.captureException(e)
    return res.redirect('/500')
  }

  return next()
}

export const ensureLocation = (req, res, next) => {
  /* If we don't have a location string being passed in, something is wrong */
  return _ensureBody(req, res, next, () => setGlobalLocation(req.subdomain))
}

const getStacktraceData = data => {
  let stacktrace = data.exception && data.exception[0].stacktrace

  if (stacktrace && stacktrace.frames) {
    stacktrace.frames.forEach(function(frame) {
      if (frame.filename.startsWith('/')) {
        frame.filename = 'app:///' + path.basename(frame.filename)
      }
    })
  }

  return data
}

/* Raven config */

Raven.config('https://a2315885b9c3429a918336c1324afa4a@sentry.io/1241616', {
  dataCallback: getStacktraceData,
  release: getReleaseHash,
}).install()

export const setRavenContext = (req, res, next) => {
  const { headers: { host } = {}, subdomain, path } = req

  Raven.setContext({
    tags: {
      host,
      subdomain,
      path,
      stage: process.env.RAZZLE_STAGE,
    },
    extra: {
      release: getReleaseHash(),
    },
  })

  return next()
}

/* Content Security Policy config */
/* IMPORTANT : Content policy is blocking localhost:3005 so it was added below */

export const cspConfig = {
  defaultSrc: [
    "'self'",
    'http://localhost:3005/',
    'ws://localhost:3005/',
    'http://localhost:4011/',
  ],
  fontSrc: ["'self'", 'https://fonts.gstatic.com'],
  imgSrc: [
    "'self'",
    'data:',
    'https://www.google-analytics.com',
    'http://localhost:3005',
  ],
  scriptSrc: [
    "'self'",
    'https://cdn.ravenjs.com',
    'http://localhost:3005/',
    'https://www.google-analytics.com',
    "'unsafe-inline'",
  ],
  styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
}
