import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
    </header>
    <h1>About Us</h1>
    <p>Hello Medium!</p>
  </div>
)
