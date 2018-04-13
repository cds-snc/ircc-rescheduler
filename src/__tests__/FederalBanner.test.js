import { mount } from 'enzyme'
import { ApolloProvider } from 'react-apollo'
import FederalBanner from '../FederalBanner'
import React from 'react'
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

describe('<FederalBanner />', () => {
  it('renders', () => {
    const federalBanner = mount(
      <ApolloProvider client={client}>
        <FederalBanner />
      </ApolloProvider>,
    )
    expect(federalBanner.find('svg')).toBeTruthy()
  })
})
