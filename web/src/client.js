import 'babel-polyfill'
import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ensureReady, After } from '@jaredpalmer/after'
import { ApolloProvider, Query } from 'react-apollo'
import { I18nProvider } from 'lingui-react'
import { unpackCatalog } from 'lingui-i18n'
import routes from './routes'
import createApolloClient from './utils/createApolloClient'
import gql from 'graphql-tag'
import en from '../locale/en/messages.js'
import fr from '../locale/fr/messages.js'

import Raven from 'raven-js'
if (window) {
  window.Raven = Raven
  window.Raven.config(
    'https://f8b5f68731864265b10502eb0b29c042@sentry.io/1215804',
  ).install()
}

const catalogs = { en: unpackCatalog(en), fr: unpackCatalog(fr) }

// required in development only (huge dependency)
const dev =
  process.env.NODE_ENV !== 'production' ? require('lingui-i18n/dev') : undefined

const client = createApolloClient({ ssrMode: false })

ensureReady(routes).then(data =>
  hydrate(
    <ApolloProvider client={client}>
      <Query
        query={gql`
          {
            language @client
          }
        `}
      >
        {({ loading, error, data }) => {
          //If you are getting SSR warnings, comment out the ifs to debug further
          if (loading) return <p>loading... </p>
          if (error) return <p>Error</p>

          return (
            <I18nProvider
              language={data.language}
              catalogs={catalogs}
              development={dev}
            >
              <BrowserRouter>
                <After data={data} routes={routes} />
              </BrowserRouter>
            </I18nProvider>
          )
        }}
      </Query>
    </ApolloProvider>,
    document.getElementById('root'),
  ),
)

if (module.hot) {
  module.hot.accept()
}
