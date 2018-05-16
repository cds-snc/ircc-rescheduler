import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

const _logError = error => {
  /* TODO log error.message */
  return undefined
}
export const Submission = props => (
  <Mutation mutation={props.action} onError={_logError}>
    {(submit, { data, error, called, loading }) => {
      if (called && !loading) {
        if (error || data.errors) {
          return error ? props.failure(error) : props.failure(data.errors)
        }
        if (data) return props.success(data)
      } else {
        return props.children(submit)
      }
    }}
  </Mutation>
)

Submission.propTypes = {
  children: PropTypes.func.isRequired,
  action: PropTypes.object.isRequired,
  success: PropTypes.func.isRequired,
  failure: PropTypes.func.isRequired,
}
