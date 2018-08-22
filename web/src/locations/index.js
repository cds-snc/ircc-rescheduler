export const getGlobalLocation = () => {
  //@ todo this will return the location object from context
  // .i.e. calgary.js
  // return context.location
  return null
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
