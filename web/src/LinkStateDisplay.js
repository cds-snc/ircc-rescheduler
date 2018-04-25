import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const QUERY = gql`
  query getUserData {
    userRegistrationData @client {
      fullName
      paperFileNumber
      reason
      explanation
    }
  }
`

class LinkStateDisplay extends React.Component {
  render() {
    const {
      data: { loading, error, userRegistrationData: values },
    } = this.props
    if (error) {
      return (
        <div>
          <h2>ERROR!</h2>
          <p>{error}</p>
        </div>
      )
    }

    if (loading) {
      return (
        <div>
          <h2>LOADING!</h2>
          <p>Loading...</p>
        </div>
      )
    }

    return (
      <div>
        <h2>DATA!</h2>
        <pre>{JSON.stringify(values)}</pre>
      </div>
    )
  }
}
LinkStateDisplay.propTypes = {
  data: PropTypes.any.isRequired,
}

export default graphql(QUERY)(LinkStateDisplay)
