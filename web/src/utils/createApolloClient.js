import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag'

const cache = new InMemoryCache()

const typeDefs = `
  type UserData {
    fullName: String
    paperFileNumber: String
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
            userRegistrationData @client {
              fullName
              paperFileNumber
              reason
              explanation
            }
          }
        `
        const { fullName, reason, paperFileNumber, explanation } = args.data
        const data = {
          userRegistrationData: {
            __typename: 'UserData',
            fullName,
            paperFileNumber,
            reason,
            explanation,
          },
        }
        cache.writeQuery({ data, query })
        return null
      },
    },
  },
  defaults: {
    language: 'en',
    userRegistrationData: {
      __typename: 'UserData',
      fullName: '',
      paperFileNumber: '',
      reason: '',
      explanation: '',
    },
  },
  typeDefs,
})
const createApolloClient = ssrMode =>
  new ApolloClient({
    ssrMode,
    link: ApolloLink.from([stateLink]),
    cache: ssrMode
      ? new InMemoryCache()
      : new InMemoryCache().restore(window.__APOLLO_STATE__),
  })

export default createApolloClient
