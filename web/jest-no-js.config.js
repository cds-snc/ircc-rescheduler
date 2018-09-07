'use strict'

const jestDefaultConfig = require('./jest.config.js')

module.exports = {
  ...jestDefaultConfig,
  testPathIgnorePatterns: [
    '/node_modules/',
    'NoJS.test.js',
    'NoJS-*',
  ],
}
