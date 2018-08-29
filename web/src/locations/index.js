const LocationCache = (function() {
  let _cachedLocation = undefined

  /* this is called once on the server and once on the client */
  const _setLocation = location => {
    if (location && location.id) {
      _cachedLocation = location
      return
    }

    try {
      // eslint-disable-next-line security/detect-non-literal-require
      _cachedLocation = require(`../locations/${location}.js`)
    } catch (e) {
      _cachedLocation = { id: location }
    }
  }

  const getLocation = location => {
    if (!_cachedLocation || (location && _cachedLocation.id !== location)) {
      /* if
          - no previous location has been saved
          - no location string provided
        throw an error
      */
      if (!location) {
        if (process.env.NODE_ENV === 'test') {
          location = 'vancouver'
        } else {
          throw new Error(
            'LocationCache.getLocation: `location` must be a non-empty string',
          )
        }
      }
      _setLocation(location)
    }

    return _cachedLocation
  }

  return {
    getLocation,
  }
})()

export const getGlobalLocation = subdomain => {
  return LocationCache.getLocation(subdomain)
}

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

export const getReceivingEmail = (location = getGlobalLocation()) => {
  if (
    process.env.RAZZLE_STAGE &&
    process.env.RAZZLE_STAGE !== 'production' &&
    process.env.RAZZLE_IRCC_TEST_RECEIVING_ADDRESS
  ) {
    return process.env.RAZZLE_IRCC_TEST_RECEIVING_ADDRESS
  }

  if (location && location.receivingEmail) {
    return location.receivingEmail
  }

  throw new Error('Receiving address is not defined')
}
