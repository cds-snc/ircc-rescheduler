module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'standard',
    'prettier',
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:security/recommended',
  ],
  plugins: ['jest', 'security','cy', 'Cypress', 'react'],
  env: {
    'jest/globals': true,
    'cypress/globals': true,
    "globals": ["cy", "Cypress", "expect", "assert"]
  },
 
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
  },
  settings: {
    react: {
      version: '16.4.2',
    },
  },
}
