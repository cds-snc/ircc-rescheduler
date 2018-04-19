import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag'

const cache = new InMemoryCache()

const typeDefs = `
  type Mutation {
    switchLanguage: String
    registerUser: String
  }
  type Query {
    language: String
    userRegistrationData: String
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
      registerUser: (_, args, { cache }) => {
        let query = gql`
          {
            userRegistrationData @client
          }
        `

        const data = {
          userRegistrationData: args.userRegistrationData,
        }
        //const { fullName, reason, uciNumber, explanation } = args.formValues
        //const data = { fullName, reason, uciNumber, explanation }
        console.log(args)
        cache.writeQuery({ data, query })
        return null
      },
    },
  },
  defaults: {
    language: 'en',
    userRegistrationData: 'Default Name',
  },
  typeDefs,
})

function createApolloClient({ ssrMode }) {
  return new ApolloClient({
    ssrMode,
    link: ApolloLink.from([stateLink]),
    cache: ssrMode
      ? new InMemoryCache()
      : new InMemoryCache().restore(window.__APOLLO_STATE__),
  })
}

export default createApolloClient
