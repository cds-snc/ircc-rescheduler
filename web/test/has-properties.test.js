import validator from 'email-validator'
import path from 'path'

const exclude = function(path) {
  if (path.indexOf('index.js') === -1) {
    return path
  }
  return false
}

const checkLocation = function(obj) {
  const msg = `property requires a valid email ${obj.id}.js`
  expect(validator.validate(obj.email)).toEqual(true)
  expect(
    validator.validate(obj.receivingEmail)
  ).toEqual(true)
}

describe('Check location files for valid properties', () => {
  it('it has email and receivingEmail properties', async () => {
    const locations = require('require-all')({
      dirname: path.resolve(__dirname, '../src/locations'),
      filter: exclude,
      excludeDirs: /^\.(__tests__)$/,
      recursive: false,
    })

    for (var key in locations) {
      // check properties on each location file
      /* eslint-disable security/detect-object-injection */
      checkLocation(locations[key])
    }
  })
})
