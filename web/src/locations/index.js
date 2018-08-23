import { windowExists } from '../utils/windowExists'

const LocationCache = (function() {
  let _cachedLocation = undefined

  /* this is called once on the server and once on the client */
  const _setLocation = location => {
    try {
      _cachedLocation = require(`../locations/${location}.js`)
    } catch (e) {
      _cachedLocation = { id: location }
    }
  }

  const getLocation = location => {
    // could do an additional check if we wanted to be able to reset locations
    if (!_cachedLocation) {
      // if no previous location has been saved, and no location string provided, throw an error
      if (!location) {
        throw new Error(
          'LocationCache.getLocation: `location` must be a non-empty string',
        )
      }
      _setLocation(location)
    }

    return _cachedLocation
  }

  const hasLocation = () => (_cachedLocation ? true : false)

  return {
    getLocation,
    hasLocation,
  }
})()

export const getGlobalLocation = subdomain => {
  if (!subdomain && !LocationCache.hasLocation() && windowExists()) {
    // this is called ONCE on the client side, but it's super annoying
    // TODO: check window.location.hostname for location (yuck)
    subdomain = 'vancouver'
  }

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
