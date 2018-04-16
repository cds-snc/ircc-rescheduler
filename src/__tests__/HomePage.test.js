import { shallow } from 'enzyme'
import HomePage from '../HomePage'
import React from 'react'
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

describe('<HomePage />', () => {
  it('renders', () => {
    const wrapper = shallow(
      <ApolloProvider client={client}>
        <HomePage />
      </ApolloProvider>,
    )
    expect(wrapper.is('HomePage')).toBeTruthy()
  })
})
