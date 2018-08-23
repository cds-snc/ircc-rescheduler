import 'babel-polyfill'
import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ensureReady, After } from '@jaredpalmer/after'
import routes from './routes'
import { Context } from './context'

ensureReady(routes).then(data => {
  return hydrate(
    <BrowserRouter>
      <Context.Provider value={{ location: data.context.location }}>
        <After data={data} routes={routes} />
      </Context.Provider>
    </BrowserRouter>,
    document.getElementById('root'),
  )
})

if (module.hot) {
  module.hot.accept()
}
