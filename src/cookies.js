const inTenMinutes = () => new Date(new Date().getTime() + 10 * 60 * 1000)
const inOneDay = () => new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)

export const setStoreCookie = (setCookieFunc, cookie, options = {}) => {
  cookie = JSON.stringify(cookie)

  let defaults = {
    secure:
      !process.env.RAZZLE_IS_HTTP && process.env.NODE_ENV === 'production',
    expires:
      process.env.NODE_ENV === 'production' ? inOneDay() : inTenMinutes(),
  }

  setCookieFunc('store', cookie, { ...defaults, ...options })
}

export const getStoreCookie = (cookies, key) => {
  let cookie = cookies && cookies.store ? cookies.store : false

  if (cookie) {
    try {
      cookie = JSON.parse(cookie)
    } catch (e) {
      return false
    }
  }
  // eslint-disable-next-line security/detect-object-injection
  return cookie && key && cookie[key] ? cookie[key] : cookie
}

export const setSSRCookie = (res, key, val, prevCookie) => {
  prevCookie = prevCookie || {}
  let newCookie = { [key]: val }

  // create new cookie by merging with previous values
  let cookie = { ...prevCookie, ...newCookie }

  setStoreCookie(res.cookie.bind(res), cookie)

  return cookie
}
