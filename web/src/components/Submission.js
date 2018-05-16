import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

export const Submission = props => (
  <Mutation mutation={props.action}>
    {(submit, { data, error, called, loading }) => {
      if (called && !loading) {
        if (data.errors) return props.failure(data.errors)
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
