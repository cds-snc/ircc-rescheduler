import React from 'react'
import { Trans } from 'lingui-react'
import Chevron from '../components/Chevron'
import { NavLink } from 'react-router-dom'
import { H1 } from '../styles'
import Layout from '../components/Layout'
import Title from '../components/Title'

class SetLocationPage extends React.Component {
  state = {}
  render() {
    return (
      <Layout>
        <Title path={this.props.match.path} />
        <H1>
          <Trans>Set Location</Trans>
        </H1>

        <form action="/set-location-redirect">
          <p>
            <button type="submit" name="van" value="van">
              Location 1
            </button>
          </p>
        </form>

        <form action="/set-location-redirect">
          <p>
            <button type="submit" name="cal" value="cal" onClick={this.onClick}>
              Location 2
            </button>
          </p>
        </form>
        <form action="/set-location-redirect">
          <p>
            <button
              type="submit"
              name="mtrl"
              value="mtrl"
              onClick={this.onClick}
            >
              Location 3
            </button>
          </p>
        </form>

        <NavLink className="chevron-link" to="/">
          <Chevron dir="left" />
          <Trans>Home</Trans>
        </NavLink>
      </Layout>
    )
  }
}

export default SetLocationPage
