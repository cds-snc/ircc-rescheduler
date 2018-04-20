const express = require('express')
const graphqlHTTP = require('express-graphql')
const createSchema = require('./schema').default
const cors = require('cors')
const i18next = require('i18next')
const messages = require('./messages').default
const { LanguageDetector } = require('i18next-express-middleware')

const detector = new LanguageDetector(
  i18next.services,
  {}, // detector options
  { fallbackLng: 'en' }, // allOptions
)

i18next.init(messages)

const Server = context => {
  // TODO: Throw if no mailer and receivingAddress
  return express()
    .use(cors())
    .use(
      '/graphql',
      graphqlHTTP((request, response) => {
        let lang = detector.detect(request, response)
        return new Promise((resolve, reject) => {
          i18next.changeLanguage(lang, (err, t) => {
            if (err) {
              reject(new Error('Language detection failed.'))
            } else {
              resolve({
                schema: createSchema(t),
                context,
                graphiql: true,
              })
            }
          })
        })
      }),
    )
}

module.exports.default = Server
