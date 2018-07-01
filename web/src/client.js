import 'babel-polyfill'
import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ensureReady, After } from '@jaredpalmer/after'
import routes from './routes'

import Raven from 'raven-js'
if (window) {
  window.Raven = Raven
  window.Raven.config(
    'https://f8b5f68731864265b10502eb0b29c042@sentry.io/1215804',
  ).install()
}

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <After data={data} routes={routes} />
    </BrowserRouter>,
    document.getElementById('root'),
  ),
)

if (module.hot) {
  module.hot.accept()
}
