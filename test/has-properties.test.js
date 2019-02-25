import validator from 'email-validator'
import path from 'path'

const exclude = function(path) {
  if (path.indexOf('index.js') === -1) {
    return path
  }
  return false
}

const checkLocation = function(obj) {
  expect(validator.validate(obj.email)).toEqual(true)
  expect(validator.validate(obj.receivingEmail)).toEqual(true)
}

describe('Check location files for valid properties', () => {
  const locations = require('require-all')({
    dirname: path.resolve(__dirname, '../src/locations'),
    filter: exclude,
    excludeDirs: /^\.(__tests__)$/,
    recursive: false,
  })

  it('it has email and receivingEmail properties', async () => {
    for (var key in locations) {
      // check properties on each location file
      /* eslint-disable security/detect-object-injection */
      checkLocation(locations[key])
    }
  })

  it('it has all the months of the year in "recurring"', async () => {
    const months = [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ]

    for (var key in locations) {
      /* eslint-disable security/detect-object-injection */
      let location = locations[key]

      // check properties on each location file
      expect(location).toHaveProperty('recurring')
      let locationMonths = Object.keys(location.recurring)
      expect(locationMonths.sort()).toEqual(months.sort())
    }
  })
})
