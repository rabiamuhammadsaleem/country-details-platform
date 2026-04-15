import React from 'react'
import { useNavigate } from 'react-router-dom'

const CountryCard = ({ country }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/country/${country.name.common}`)
  }

  return (
    <div className="country-card" onClick={handleClick}>
      <div className="card-image">
        <img 
          src={country.flags?.svg || country.flags?.png} 
          alt={`${country.name.common} flag`}
          loading="lazy"
        />
      </div>
      <div className="card-content">
        <h3 className="country-name">{country.name.common}</h3>
        <p className="country-capital">
          <span className="label">🏛️ Capital:</span> {country.capital?.[0] || 'N/A'}
        </p>
        <p className="country-population">
          <span className="label">👥 Population:</span> {country.population?.toLocaleString() || 'N/A'}
        </p>
        <p className="country-region">
          <span className="label">🌍 Region:</span> {country.region || 'N/A'}
        </p>
        <button className="details-btn">View Details →</button>
      </div>
    </div>
  )
}

export default CountryCard