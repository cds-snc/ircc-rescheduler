import { ApolloLink, Observable } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client' // eslint-disable-line import/no-named-as-default

function createMockLink(options) {
  return new ApolloLink(
    () =>
      new Observable(observer => {
        if (!options.fail) {
          observer.next({
            data: options.resolveWith,
          })
          observer.complete()
        } else {
          observer.error(options.failWith)
        }
      }),
  )
}

export default options =>
  new ApolloClient({
    link: createMockLink(options).request,
    cache: new InMemoryCache(),
  })
