import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'unfetch'
import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag'
import { dateToISODateString } from '../Time'

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
    selectDays(data: [String]!)
  }

  type Query {
    language: String
    userRegistrationData: UserData
    selectedDays: [String]!
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
      selectDays: (_, args, { cache }) => {
        let query = gql`
          {
            selectedDays @client
          }
        `
        const data = {
          selectedDays: args.data.map(d => dateToISODateString(d)),
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
    selectedDays: [],
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
