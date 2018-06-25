import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'unfetch'
import { withClientState } from 'apollo-link-state'
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
const createApolloClient = ({ ssrMode }) =>
  new ApolloClient({
    ssrMode,
    link: ApolloLink.from([stateLink, new HttpLink({ fetch })]),
    cache: ssrMode
      ? new InMemoryCache()
      : new InMemoryCache().restore(window.__APOLLO_STATE__),
  })

export default createApolloClient
