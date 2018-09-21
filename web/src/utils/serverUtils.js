import { setGlobalLocation, getReceivingEmail, whitelist } from '../locations'
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

export const forceRedirect = req => {
  if (req.subdomain.startsWith('rescheduler')) {
    if (notPageMatch(req.path, 'not-found') && notPageMatch(req.path, '500')) {
      return true
    }
  }

  return false
}

export const getPrimarySubdomain = function(req, res, next) {
  req.subdomain = req.subdomains.slice(-1).pop()

  const protocol = process.env.RAZZLE_IS_HTTP ? 'http' : 'https'

  // handle localhost or Heroku
  if (!req.subdomain || isHeroku(req.subdomain)) {
    // default to vancouver for now
    req.subdomain = 'vancouver'
  }

  /*
    If no sub-domain is found
    force redirect to vancouver sub-domain on staging and prod
    note: this is temporary to handle existing vancouver traffic / links
    */

  if (forceRedirect(req)) {
    return res.redirect(
      `${protocol}://vancouver.${process.env.RAZZLE_SITE_URL}`,
    )
  }

  /* If domain isn't on the whitelist and we're not on the not-found or 500 page */
  if (
    !whitelist.includes(req.subdomain) &&
    notPageMatch(req.path, 'not-found') &&
    notPageMatch(req.path, '500')
  ) {
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

export const ensureReceivingEmail = (req, res, next) => {
  /* If we don't have a receiving email, something isn't configured properly */
  return _ensureBody(req, res, next, getReceivingEmail)
}

// look for heroku url i.e. https://ircc-development-pr-420.herokuapp.com/
const isHeroku = subdomain => {
  if (subdomain.indexOf('pr-') !== -1) {
    return true
  }

  return false
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
