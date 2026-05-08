import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import LoadingSpinner from '../components/LoadingSpinner'

const CountryDetails = () => {
  const { name } = useParams()
  const navigate = useNavigate()
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [borderCountriesFull, setBorderCountriesFull] = useState([])

  useEffect(() => {
    fetchCountryDetails()
  }, [name])

  const fetchCountryDetails = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      if (!response.ok) throw new Error('Country not found')
      const data = await response.json()
      const countryData = data[0]
      setCountry(countryData)
      
      // Fetch full names of border countries
      if (countryData.borders && countryData.borders.length > 0) {
        const borderNames = await Promise.all(
          countryData.borders.map(async (borderCode) => {
            const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`)
            if (borderResponse.ok) {
              const borderData = await borderResponse.json()
              return borderData[0]?.name?.common || borderCode
            }
            return borderCode
          })
        )
        setBorderCountriesFull(borderNames)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getLanguages = (languages) => {
    if (!languages) return 'N/A'
    return Object.values(languages).join(', ')
  }

  const getCurrencies = (currencies) => {
    if (!currencies) return 'N/A'
    return Object.values(currencies).map(c => `${c.name} (${c.symbol || 'N/A'})`).join(', ')
  }

  if (loading) return <LoadingSpinner />

  if (error || !country) {
    return (
      <>
        <Navbar />
        <div className="error-container">
          <div className="error-card">
            <h1>❌</h1>
            <h2>Country Not Found</h2>
            <p>We couldn't find information for "{decodeURIComponent(name)}"</p>
            <button onClick={() => navigate('/')} className="retry-btn">
              ← Back to Home
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="details-page">
        <div className="details-container">
          <button onClick={() => navigate('/')} className="back-btn">
            ← Back to All Countries
          </button>
          
          <div className="country-details-card">
            <div className="details-flag-section">
              <img 
                src={country.flags?.svg || country.flags?.png} 
                alt={`${country.name.common} flag`}
                className="details-flag"
              />
              <div className="flag-coat">
                {country.coatOfArms?.svg && (
                  <img src={country.coatOfArms.svg} alt="Coat of Arms" className="coat-arms" />
                )}
              </div>
            </div>
            
            <div className="details-info-section">
              <h1 className="details-name">{country.name.common}</h1>
              {country.name.official !== country.name.common && (
                <p className="official-name">Official: {country.name.official}</p>
              )}
              
              <div className="info-grid">
                <div className="info-card">
                  <span className="info-icon">🏛️</span>
                  <div>
                    <div className="info-label">Capital</div>
                    <div className="info-value">{country.capital?.[0] || 'N/A'}</div>
                  </div>
                </div>
                
                <div className="info-card">
                  <span className="info-icon">👥</span>
                  <div>
                    <div className="info-label">Population</div>
                    <div className="info-value">{country.population?.toLocaleString() || 'N/A'}</div>
                  </div>
                </div>
                
                <div className="info-card">
                  <span className="info-icon">🌍</span>
                  <div>
                    <div className="info-label">Region</div>
                    <div className="info-value">{country.region || 'N/A'}</div>
                  </div>
                </div>
                
                <div className="info-card">
                  <span className="info-icon">🗺️</span>
                  <div>
                    <div className="info-label">Subregion</div>
                    <div className="info-value">{country.subregion || 'N/A'}</div>
                  </div>
                </div>
                
                <div className="info-card">
                  <span className="info-icon">🗣️</span>
                  <div>
                    <div className="info-label">Languages</div>
                    <div className="info-value">{getLanguages(country.languages)}</div>
                  </div>
                </div>
                
                <div className="info-card">
                  <span className="info-icon">💰</span>
                  <div>
                    <div className="info-label">Currencies</div>
                    <div className="info-value">{getCurrencies(country.currencies)}</div>
                  </div>
                </div>
                
                <div className="info-card">
                  <span className="info-icon">📏</span>
                  <div>
                    <div className="info-label">Area</div>
                    <div className="info-value">{country.area?.toLocaleString()} km²</div>
                  </div>
                </div>
                
                <div className="info-card">
                  <span className="info-icon">🌐</span>
                  <div>
                    <div className="info-label">Timezones</div>
                    <div className="info-value">{country.timezones?.length || 0} zones</div>
                  </div>
                </div>
                
                <div className="info-card">
                  <span className="info-icon">📞</span>
                  <div>
                    <div className="info-label">Calling Code</div>
                    <div className="info-value">{country.idd?.root}{country.idd?.suffixes?.[0] || ''}</div>
                  </div>
                </div>
                
                <div className="info-card">
                  <span className="info-icon">🧭</span>
                  <div>
                    <div className="info-label">Borders</div>
                    <div className="info-value">{country.borders?.length || 0} countries</div>
                  </div>
                </div>
              </div>
              
              {borderCountriesFull.length > 0 && (
                <div className="borders-section">
                  <h3>📍 Border Countries</h3>
                  <div className="borders-list">
                    {borderCountriesFull.map((border, index) => (
                      <span 
                        key={index} 
                        className="border-tag"
                        onClick={() => navigate(`/country/${border}`)}
                        style={{ cursor: 'pointer' }}
                      >
                        {border}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="map-link">
                <a href={country.maps?.googleMaps} target="_blank" rel="noopener noreferrer" className="map-btn">
                  🗺️ View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CountryDetails