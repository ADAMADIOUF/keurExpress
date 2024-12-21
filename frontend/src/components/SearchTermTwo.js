import React, { useState } from 'react'
import { FaMapMarkerAlt, FaBuilding, FaDollarSign } from 'react-icons/fa'

const SearchTermTwo = () => {
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [price, setPrice] = useState('')

  const handleLocationChange = (e) => setLocation(e.target.value)
  const handlePropertyTypeChange = (e) => setPropertyType(e.target.value)
  const handlePriceChange = (e) => setPrice(e.target.value)

  return (
    <div className='search-term-container'>
      <div className='search-term'>
        <label>
          <FaMapMarkerAlt className='search-icon' />
          Location:
          <input
            type='text'
            value={location}
            onChange={handleLocationChange}
            placeholder='Enter location'
          />
        </label>
      </div>

      <div className='search-term'>
        <label>
          <FaBuilding className='search-icon' />
          Property Type:
          <input
            type='text'
            value={propertyType}
            onChange={handlePropertyTypeChange}
            placeholder='Enter property type'
          />
        </label>
      </div>

      <div className='search-term'>
        <label>
          <FaDollarSign className='search-icon' />
          Price:
          <input
            type='text'
            value={price}
            onChange={handlePriceChange}
            placeholder='Enter price range'
          />
        </label>
      </div>

      <div className='search-button'>
        <button>Search</button>
      </div>
    </div>
  )
}

export default SearchTermTwo
