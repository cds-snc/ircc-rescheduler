import React from 'react'
import express from 'express'
import cookieParser from 'cookie-parser'
import { SECRET } from './cookies'
import { render } from '@jaredpalmer/after'
import { renderToString } from 'react-dom/server'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import routes from './routes'
import createApolloClient from './utils/createApolloClient'
import Document from './Document'
import path from 'path'
import { renderStylesToString } from 'emotion-server'
import bodyParser from 'body-parser'
import { SUBMIT } from './queries'
import cors from 'cors'

// eslint-disable-next-line security/detect-non-literal-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST ||
  path.join(process.cwd(), 'build', 'assets.json'))

const server = express()
const client = createApolloClient({ ssrMode: true })

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || 'public'))
  .use(cookieParser(SECRET))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cors())
  .post('/submit', async (req, res) => {
    try {
      const dates = req.body.availability.split(',')
      req.body.availability = dates

      /*
      let data = {
        fullName: 'john li',
        email: 'john@johnliindustries.com',
        explanation: 'this is a textbox field with a bunch of freely-formatted text',
        reason: 'medical',
        availability: ['2018-09-05', '2018-09-06', '2018-09-12']
      }
      */

      const response = await client.mutate({
        mutation: SUBMIT,
        variables: req.body,
      })

      res.json(response)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message)
      res.json(e.message)
    }
  })
  .get('/clear', (req, res) => {
    res.clearCookie('store')
    res.redirect('/cancel')
  })
  .get('/*', async (req, res) => {
    const customRenderer = node => {
      const client = createApolloClient({ ssrMode: true })
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

      return res.locals.redirect
        ? res.redirect(res.locals.redirect)
        : res.send(html)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.message, error.stack)
      res.redirect('/error')
    }
  })

export default server
