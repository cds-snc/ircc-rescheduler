import 'babel-polyfill'
import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ensureReady, After } from '@jaredpalmer/after'
import routes from './routes'
import { windowExists } from './utils/windowExists'

import Raven from 'raven-js'
if (windowExists() && process.env.NODE_ENV === 'production') {
  window.Raven = Raven
  window.Raven.config(
    'https://a2315885b9c3429a918336c1324afa4a@sentry.io/1241616',
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
