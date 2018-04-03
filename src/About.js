import React from 'react'
import { NavLink } from 'react-router-dom'

class About extends React.Component {
  render() {
    return (
      <div>
        <NavLink to="/">Home</NavLink> <NavLink to="/about">About</NavLink>
        <h1>About</h1>
        <p>This is the about page</p>
      </div>
    )
  }
}

export default About
