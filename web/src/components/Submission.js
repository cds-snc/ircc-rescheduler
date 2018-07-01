import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider, Mutation } from 'react-apollo'

import createApolloClient from '../utils/createApolloClient'

const client = createApolloClient({ ssrMode: false })

export const Submission = props => (
  <Mutation mutation={props.action} onError={props.onError}>
    {(submit, { data, error, called, loading }) => {
      if (called && !loading) {
        if (error || data.errors) {
          return error ? props.failure(error) : props.failure(data.errors)
        }
        if (data) return props.success(data)
      } else {
        return props.children(submit, loading)
      }
    }}
  </Mutation>
)

Submission.propTypes = {
  children: PropTypes.func.isRequired,
  action: PropTypes.object.isRequired,
  success: PropTypes.func.isRequired,
  failure: PropTypes.func.isRequired,
  onError: PropTypes.func,
}

export const ApolloSubmission = props => (
  <ApolloProvider client={client}>
    <Submission {...props} />
  </ApolloProvider>
)
