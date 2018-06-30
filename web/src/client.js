import 'babel-polyfill'
import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ensureReady, After } from '@jaredpalmer/after'
import { ApolloProvider } from 'react-apollo'
import routes from './routes'
import createApolloClient from './utils/createApolloClient'

import Raven from 'raven-js'
if (window) {
  window.Raven = Raven
  window.Raven.config(
    'https://f8b5f68731864265b10502eb0b29c042@sentry.io/1215804',
  ).install()
}

const client = createApolloClient({ ssrMode: false })

ensureReady(routes).then(data =>
  hydrate(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <After data={data} routes={routes} />
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root'),
  ),
)

if (module.hot) {
  module.hot.accept()
}
