import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-fetch'

const uri = '/graphql'

const createApolloClient = ({ ssrMode }) =>
  new ApolloClient({
    ssrMode,
    link: new HttpLink({ fetch, uri }),
    cache: new InMemoryCache(),
  })

export default createApolloClient
