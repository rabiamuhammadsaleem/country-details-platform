import React, { useState } from 'react'

const SearchBar = ({ onSearch, onReset }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleReset = () => {
    setSearchTerm('')
    onReset()
  }

  return (
    <div className="search-section">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search country by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button type="button" className="clear-btn" onClick={() => setSearchTerm('')}>
              ✕
            </button>
          )}
        </div>
        <div className="search-buttons">
          <button type="submit" className="btn-search">
            Search
          </button>
          <button type="button" onClick={handleReset} className="btn-reset">
            Reset All
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar