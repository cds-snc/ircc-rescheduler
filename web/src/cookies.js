import cookieEncrypter from 'cookie-encrypter'

const inOneWeek = () => new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)

export const SECRET = 'Immediate convocation of a Party'

const _whitelist = ({ query, fields }) => {
  /* filter a dict by whitelisted keys
  https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
  */
  return Object.keys(query)
    .filter(key => fields.includes(key))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: query[key], // eslint-disable-line security/detect-object-injection
      }
    }, {})
}

export const setStoreCookie = (setCookieFunc, cookie, options = {}) => {
  if (
    cookie === null || // if obj is null
    typeof cookie !== 'object' || // if obj is _not_ an object
    Object.keys(cookie).length === 0 // if obj is empty
  ) {
    throw new Error('setStoreCookie: `cookie` must be a non-empty object')
  }

  cookie = cookieEncrypter.encryptCookie(JSON.stringify(cookie), {
    key: SECRET,
  })

  let expires = {
    expires: inOneWeek(),
  }

  setCookieFunc('store', cookie, { ...expires, ...options })
}

export const getStoreCookie = cookies => {
  let cookie = cookies && cookies.store ? cookies.store : false

  if (cookie) {
    /* Cookie will only be encryped when NODE_ENV is *not* 'development' */
    try {
      cookie = JSON.parse(
        cookieEncrypter.decryptCookie(cookie, { key: SECRET }),
      )
    } catch (e) {
      return false
    }

    /* console.log('found cookie! ', cookie) */
  }
  return cookie
}

export const setSSRCookie = (req, res, match, fields = [], validate = null) => {
  let { query } = req

  if (
    Object.keys(query).length && // a query was submitted
    fields.length && // there are fields explicitly defined for the page
    typeof validate === 'function' // there is a validate function passed-in
  ) {
    // whitelist query keys so that arbitrary keys aren't saved to the store
    query = fields ? _whitelist({ query, fields }) : query

    // reset values that don't pass validation
    let errors = validate(query)
    Object.keys(errors || {}).forEach(field => {
      query[field] = '' // eslint-disable-line security/detect-object-injection
    })

    let prevCookie = getStoreCookie(req.cookies) || {}
    // match.path === "/about" or similar
    let path = match.path.slice(1)
    let newCookie = { [path]: query }

    // create new cookie by merging with previous values
    let cookie = { ...prevCookie, ...newCookie }

    /* console.log('set cookie! ', cookie) */
    setStoreCookie(res.cookie.bind(res), cookie)
    return cookie
  }
  return false
}
