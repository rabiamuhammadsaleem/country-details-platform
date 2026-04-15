import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🌍</span>
          <span className="logo-text">Country<span className="logo-highlight">Details</span></span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar