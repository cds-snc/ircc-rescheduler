import React from 'react'
import { NavLink } from 'react-router-dom'

class Home extends React.Component {
  render() {
    return (
      <div>
        <NavLink to="/">Home</NavLink> <NavLink to="/about">About</NavLink>
        <h1>Home</h1>
        <p>This is the home page</p>
      </div>
    )
  }
}

export default Home
