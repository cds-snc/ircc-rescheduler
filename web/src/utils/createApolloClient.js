import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import fetch from 'isomorphic-fetch'
import gql from 'graphql-tag'

const cache = new InMemoryCache()

const typeDefs = `
  type Mutation {
    switchLanguage: String
  }

  type Query {
    language: String
  }
`

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      switchLanguage: (_, args, { cache }) => {
        let query = gql`
          {
            language @client
          }
        `
        let current = cache.readQuery({ query })
        const data = {
          language: current.language === 'en' ? 'fr' : 'en',
        }
        cache.writeQuery({ data, query })
        return null
      },
    },
  },
  defaults: {
    language: 'en',
  },
  typeDefs,
})

function createApolloClient({ ssrMode }) {
  return new ApolloClient({
    ssrMode,
    link: ApolloLink.from([
      stateLink,
      createHttpLink({
        uri: 'http://nrcanapi.cds-snc.ca/graphql',
        credentials: 'same-origin', // um
        fetch,
      }),
    ]),
    cache: ssrMode
      ? new InMemoryCache()
      : new InMemoryCache().restore(window.__APOLLO_STATE__),
  })
}

export default createApolloClient
