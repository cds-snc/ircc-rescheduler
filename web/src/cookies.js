import cookieEncrypter from 'cookie-encrypter'

const inTenMinutes = () => new Date(new Date().getTime() + 10 * 60 * 1000)
const inOneWeek = () => new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)

export const SECRET =
  process.env.RAZZLE_COOKIE_SECRET ||
  'Hey I just met you And this is crazy'.slice(0, 32)

export const setStoreCookie = (setCookieFunc, cookie, options = {}) => {
  cookie = cookieEncrypter.encryptCookie(JSON.stringify(cookie), {
    key: SECRET,
  })

  let defaults = {
    secure:
      !process.env.RAZZLE_COOKIE_HTTP && process.env.NODE_ENV === 'production',
    expires:
      process.env.NODE_ENV === 'production' ? inOneWeek() : inTenMinutes(),
  }

  setCookieFunc('store', cookie, { ...defaults, ...options })
}

export const getStoreCookie = (cookies, key) => {
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
  // eslint-disable-next-line security/detect-object-injection
  return cookie && key && cookie[key] ? cookie[key] : cookie
}

export const setSSRCookie = (res, key, val, prevCookie) => {
  prevCookie = prevCookie || {}
  let newCookie = { [key]: val }

  // create new cookie by merging with previous values
  let cookie = { ...prevCookie, ...newCookie }

  /* console.log('set cookie! ', cookie) */
  setStoreCookie(res.cookie.bind(res), cookie)

  return cookie
}
