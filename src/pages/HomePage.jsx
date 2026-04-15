import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import LoadingSpinner from '../components/LoadingSpinner'

const HomePage = () => {
  const navigate = useNavigate()
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  
  const countriesPerPage = 12

  // 18 Famous Countries List (2 aur countries add kiye)
  const famousCountriesNames = [
    'Pakistan', 'India', 'United States', 'United Kingdom', 'China', 'Japan',
    'Germany', 'France', 'Italy', 'Canada', 'Australia', 'Brazil', 'Turkey',
    'Egypt', 'United Arab Emirates', 'Saudi Arabia', 'Malaysia', 'Indonesia',
    'South Africa', 'Russia', 'South Korea', 'Spain', 'Mexico', 'Thailand',
    'Netherlands', 'Switzerland'  // ✅ 2 naye countries add kiye
  ]

  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,cca3,currencies,languages')
      if (!response.ok) throw new Error('Failed to fetch countries')
      const data = await response.json()
      const sortedData = data.sort((a, b) => a.name.common.localeCompare(b.name.common))
      setCountries(sortedData)
      setFilteredCountries(sortedData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Get famous countries data (18 countries)
  const getFamousCountries = () => {
    return countries.filter(country => 
      famousCountriesNames.includes(country.name.common)
    ).slice(0, 18)  // ✅ 18 countries
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const term = e.target.search?.value || ''
    setSearchTerm(term)
    setCurrentPage(1)
    
    if (!term.trim()) {
      setFilteredCountries(countries)
      return
    }
    
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredCountries(filtered)
  }

  const handleReset = () => {
    setSearchTerm('')
    setCurrentPage(1)
    setFilteredCountries(countries)
    const searchInput = document.querySelector('.search-input-field')
    if (searchInput) searchInput.value = ''
  }

  const indexOfLastCountry = currentPage * countriesPerPage
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry)
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage)

  const famousCountries = getFamousCountries()

  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <>
        <Navbar />
        <div className="error-container">
          <div className="error-card">
            <h1>⚠️</h1>
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button onClick={fetchCountries} className="retry-btn">Try Again</button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="hero-section-new">
        <div className="hero-content-new">
          <span className="hero-badge-new">🌍 EXPLORE THE WORLD</span>
          <h1 className="hero-title-new">Discover Amazing <span className="hero-gradient-new">Countries</span></h1>
          <p className="hero-subtitle-new">Explore detailed information about 250+ countries including capitals, populations, currencies, and more</p>
          <div className="hero-stats-new">
            <div className="stat-item-new">
              <span className="stat-number-new">{countries.length}+</span>
              <span className="stat-label-new">Countries</span>
            </div>
            <div className="stat-item-new">
              <span className="stat-number-new">7</span>
              <span className="stat-label-new">Continents</span>
            </div>
            <div className="stat-item-new">
              <span className="stat-number-new">1000+</span>
              <span className="stat-label-new">Facts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="search-section-new">
        <div className="container-new">
          <div className="search-card-new">
            <h3>🔍 Find Your Country</h3>
            <p>Search by country name to explore detailed information</p>
            <form onSubmit={handleSearch} className="search-form-new">
              <div className="search-wrapper-new">
                <input
                  type="text"
                  name="search"
                  className="search-input-field"
                  placeholder="Enter country name..."
                  defaultValue={searchTerm}
                />
                <button type="submit" className="search-btn-new">Search</button>
                <button type="button" onClick={handleReset} className="reset-btn-new">Reset</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Featured / Famous Countries Section - 18 Countries */}
      {!searchTerm && famousCountries.length > 0 && (
        <div className="featured-section-new">
          <div className="container-new">
            <div className="section-header-new">
              <h2>🌟 Famous Countries</h2>
              <p>Most popular destinations around the world</p>
            </div>
            <div className="featured-grid-new">
              {famousCountries.map((country, index) => (
                <div 
                  key={country.cca3} 
                  className="featured-card-new" 
                  onClick={() => navigate(`/country/${country.name.common}`)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <img src={country.flags?.svg} alt={country.name.common} />
                  <div className="featured-info-new">
                    <h4>{country.name.common}</h4>
                    <span>View Details →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Countries Section */}
      <div className="all-countries-section-new">
        <div className="container-new">
          <div className="section-header-new">
            <h2>🌏 All Countries</h2>
            <p>{filteredCountries.length} countries found</p>
          </div>
          
          {filteredCountries.length === 0 ? (
            <div className="no-results-new">
              <h2>🔍 No countries found</h2>
              <p>Try searching with a different name</p>
              <button onClick={handleReset} className="reset-large-btn">Show All Countries</button>
            </div>
          ) : (
            <>
              <div className="country-grid-new">
                {currentCountries.map((country) => (
                  <div key={country.cca3} className="country-card-new" onClick={() => navigate(`/country/${country.name.common}`)}>
                    <div className="card-image-new">
                      <img src={country.flags?.svg} alt={country.name.common} />
                    </div>
                    <div className="card-content-new">
                      <h3 className="country-name-new">{country.name.common}</h3>
                      <p><span className="label-new">🏛️ Capital:</span> {country.capital?.[0] || 'N/A'}</p>
                      <p><span className="label-new">👥 Population:</span> {country.population?.toLocaleString() || 'N/A'}</p>
                      <p><span className="label-new">🌍 Region:</span> {country.region || 'N/A'}</p>
                      <button className="details-btn-new">View Details →</button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination-new">
                  <button 
                    className="page-btn-new"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    ◀ Previous
                  </button>
                  <span className="page-info-new">Page {currentPage} of {totalPages}</span>
                  <button 
                    className="page-btn-new"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next ▶
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default HomePage