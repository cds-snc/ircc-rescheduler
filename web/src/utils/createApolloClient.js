import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-fetch'

const uri =
  process.env.NODE_ENV === 'production'
    ? 'https://rescheduler.cds-snc.ca/graphql'
    : 'http://localhost:3004/graphql'

const createApolloClient = ({ ssrMode }) =>
  new ApolloClient({
    ssrMode,
    link: new HttpLink({ fetch, uri }),
    cache: new InMemoryCache(),
  })

export default createApolloClient
