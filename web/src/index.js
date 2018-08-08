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

console.log('RAZZLE_PORT', env.RAZZLE_PORT)
console.log('PORT', env.PORT)
console.log('process.env.RAZZLE_PORT', process.env.RAZZLE_PORT)
console.log('process.env.PORT', process.env.PORT)

const _port = port()

server.listen(_port, error => {
  if (error) {
    console.log(error)
  }

  console.log(`🚀 started on port ${_port}`)
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
