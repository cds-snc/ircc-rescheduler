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

import { request } from 'graphql-request'

import { execute } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import cors from 'cors'
import gql from 'graphql-tag'

// eslint-disable-next-line security/detect-non-literal-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST ||
  path.join(process.cwd(), 'build', 'assets.json'))

const server = express()
const client = createApolloClient({ ssrMode: true })
const endpoint = 'https://rescheduler.cds-snc.ca/graphql'

const data = {
  fullName: 'John Li',
  email: 'tim@line37.com',
  reason: 'Away',
  explanation: 'Sorry',
  paperFileNumber: '123446',
  selectedDays: ['2018-01-01', '2018-01-02', '2018-01-03'],
}

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || 'public'))
  .use(cookieParser(SECRET))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cors())
  .post('/email1', async (req, res) => {
    //req.bod
    try {
      const response = await request(endpoint, SUBMIT, data)

      res.json(response)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message)
      res.json(e.message)
    }
  })
  .post('/email2', async (req, res) => {
    try {
      const response = await client.mutate({
        mutation: SUBMIT,
        variables: data,
      })

      res.json(response)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message)
      res.json(e.message)
    }
  })
  .post('/email3', async (req, res) => {
    try {
      const uri = endpoint
      const link = new HttpLink({ uri })

      const operation = {
        query: SUBMIT,
        variables: data,
      }

      execute(link, operation).subscribe({
        next: data =>
          // eslint-disable-next-line no-console
          console.log(`received data: ${JSON.stringify(data, null, 2)}`),
        error: error => {
          // eslint-disable-next-line no-console
          console.log(`received error ${error}`)
        },
        complete: () => console.log(`complete`), // eslint-disable-line no-console,
      })

      res.json({ response: 'hello' })

      //res.redirect('/confirmation')
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message)
      res.json(e.message)
      //res.redirect('/error')
    }
  })
  .post('/email4', async (req, res) => {
    try {
      const response = await client.query({
        query: gql`
          query {
            hello
          }
        `,
      })

      res.json(response)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message)
      res.json(e.message)
    }
  })
  .post('/email5', async (req, res) => {
    try {
      const response = await client.mutate({
        mutation: gql`
          mutation($name: String!) {
            test(name: $name)
          }
        `,
        variables: { name: 'Paul' },
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
