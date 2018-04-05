import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const QUERY = gql`
  query TenDwellings {
    dwellings(
      limit: 10
      filters: [{ field: dwellingCity, comparator: gt, value: "A" }]
    ) {
      results {
        houseId
        city
      }
    }
  }
`

class GraphQLPage extends React.Component {
  render() {
    const { data } = this.props
    return (
      <div>
        <NavLink to="/">← Home</NavLink>
        <h1>GraphQL Page</h1>
        {data.loading === true ? (
          <div>Loading Data...</div>
        ) : (
          data.dwellings.results.map(({ city, houseId }, i) => (
            <div key={houseId}>
              <p>
                city: {city} <br />houseId: {houseId}
              </p>
            </div>
          ))
        )}
      </div>
    )
  }
}
GraphQLPage.propTypes = {
  data: PropTypes.any.isRequired,
}

export default graphql(QUERY)(GraphQLPage)
