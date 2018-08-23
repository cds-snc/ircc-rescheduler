export const returnLocationFromSubdomain = req => {
  const subdomain = 'fake'

  let location

  try {
    location = require(`../locations/${subdomain}.js`)
    location = location[subdomain]
    location.id = subdomain
  } catch (e) {
    location = { id: subdomain }
  }

  return location
}
