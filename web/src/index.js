import app from './server'
import http from 'http'

const server = http.createServer(app)

let currentApp = app

const { env } = require('process')

/* eslint-disable no-console */
/* https://github.com/jaredpalmer/razzle/issues/356#issuecomment-366275253 */
const port = () =>
  parseInt(
    env.RAZZLE_PORT ||
      env.PORT ||
      process.env.RAZZLE_PORT ||
      process.env.PORT ||
      3000,
    10,
  )

server.listen(port(), error => {
  if (error) {
    console.log(error)
  }

  console.log(`🚀 started on port ${port}`)
})

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!')

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...')
    server.removeListener('request', currentApp)
    const newApp = require('./server').default
    server.on('request', newApp)
    currentApp = newApp
  })
}

/* eslint-enable no-console */
