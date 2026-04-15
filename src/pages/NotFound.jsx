import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <div className="not-found-container">
        <div className="not-found-card">
          <div className="not-found-icon">🔍</div>
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-text">
            Oops! The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="not-found-buttons">
            <button onClick={() => navigate('/')} className="home-btn">
              🏠 Go to Homepage
            </button>
            <button onClick={() => navigate(-1)} className="back-btn-404">
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound