import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import fetch from 'isomorphic-fetch'

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      setLanguage: (_, { language }, { cache }) => {
        const data = {
          language: {
            __typename: 'String',
            language,
          },
        }
        cache.writeData({ data })
        return null
      },
    },
  },
  defaults: {
    language: {
      __typename: 'String',
      language: 'en',
    },
  },
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
