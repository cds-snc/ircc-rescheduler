import React from 'react'
import MemoryRouter from 'react-router-dom/MemoryRouter'
import { After } from '@jaredpalmer/after'
import routes from '../routes'
import { mount } from 'enzyme'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
// TODO: switch the project over to unfetch.
import fetch from 'unfetch' // eslint-disable-line no-unused-vars

const cache = new InMemoryCache()
const stateLink = withClientState({
  cache,
  defaults: {
    language: 'en',
  },
  typeDefs: `
    type Query {
      language: String
    }
`,
})

const client = new ApolloClient({
  ssrMode: true,
  link: ApolloLink.from([stateLink, new HttpLink({ fetch })]),
  cache,
})

describe('After.js', () => {
  it('renders without exploding', () => {
    expect(() => {
      mount(
        <ApolloProvider client={client}>
          <MemoryRouter>
            <After data={{}} routes={routes} />
          </MemoryRouter>
        </ApolloProvider>,
      )
    }).not.toThrow()
  })
})
