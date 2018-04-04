import React from 'react'
import express from 'express'
import { render } from '@jaredpalmer/after'
import { renderToString } from 'react-dom/server'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import routes from './routes'
import createApolloClient from './utils/createApolloClient'
import Document from './Document'
import path from 'path'
import { renderStylesToString } from 'emotion-server'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST ||
  path.join(process.cwd(), 'build', 'assets.json'))

const server = express()

server
  .disable('x-powered-by')
  .use(
    express.static(
      process.env.RAZZLE_PUBLIC_DIR || path.join(process.cwd(), 'public'),
    ),
  )
  .get('/*', async (req, res) => {
    const client = createApolloClient({ ssrMode: true })
    const customRenderer = node => {
      const App = <ApolloProvider client={client}>{node}</ApolloProvider>
      return getDataFromTree(App).then(() => {
        const initialApolloState = client.extract()
        const html = renderStylesToString(renderToString(App))
        return { html, initialApolloState }
      })
    }
    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        customRenderer,
        document: Document,
      })
      res.send(html)
    } catch (error) {
      console.log(error.message)
      res.json(error)
    }
  })

export default server
