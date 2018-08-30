'use strict'

module.exports = {
  verbose: true,
  transform: {
    '^.+\\.(js|jsx)$':
      '<rootDir>/node_modules/razzle/config/jest/babelTransform.js',
    '^.+\\.css$': '<rootDir>/node_modules/razzle/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)':
      '<rootDir>/node_modules/razzle/config/jest/fileTransform.js',
  },
  globals: {
    RAZZLE_PAPER_FILE_NUMBER_PATTERN: '[a-zA-Z]{1}',
  },
  setupTestFrameworkScriptFile: '<rootDir>/test/setupTests.js',
  testMatch: [
    '<rootDir>/**/__tests__/**/*.js',
    '<rootDir>/src/**/?(*.)(spec|test).js',
    '<rootDir>/test/**/?(*.)(spec|test).js',
  ],
  moduleFileExtensions: ['jsx', 'js', 'json'],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  setupTestFrameworkScriptFile: 'jest-expect-message',
}
