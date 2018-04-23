import { shallow } from 'enzyme'
import RegistrationPage from '../RegistrationPage'
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
    userRegistrationData: {
      __typename: 'UserData',
      fullName: '',
      uciNumber: '',
      reason: '',
      explanation: '',
    },
  },
  typeDefs: `
    type UserData {
      fullName: String
      uciNumber: String
      reason: String
      explanation: String
    }

    type Mutation {
      switchLanguage: String
      registerUser(data: UserData)
    }

    type Query {
      language: String
      userRegistrationData: UserData
    }
  `,
})

const client = new ApolloClient({
  ssrMode: true,
  link: ApolloLink.from([stateLink, new HttpLink({ fetch })]),
  cache,
})

describe('<RegistrationPage />', () => {
  it('renders', () => {
    const wrapper = shallow(
      <ApolloProvider client={client}>
        <RegistrationPage />
      </ApolloProvider>,
    )
    expect(wrapper.is('withApollo(RegistrationPage)')).toBeTruthy()
  })
})
