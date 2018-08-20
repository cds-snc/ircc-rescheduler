const cachedLocation = () => {
  let cache = {}

  // pull from cookie here
  let locationStr = 'calgary'

  return () => {
    if (locationStr in cache) {
      return cache[locationStr]
    } else {
      const result = require(`./${locationStr}`)
      cache[locationStr] = result
      return result
    }
  }
}

export const getGlobalLocation = cachedLocation()

export const getEmail = (location = getGlobalLocation()) => {
  if (location && location.email) {
    return location.email
  }
}

export const getEmailParts = (location = getGlobalLocation()) => {
  const email = getEmail(location)
  if (!email) return ['', '']
  let split = email.split('@')
  return split
}

export const getPhone = (location = getGlobalLocation()) => {
  if (location && location.phone) {
    return location.phone
  }
}
