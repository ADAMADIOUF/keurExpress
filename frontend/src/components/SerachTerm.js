import React, { useState } from 'react'

const SearchTerm = () => {
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [searchResults, setSearchResults] = useState([])

  // Handle the location input change
  const handleLocationChange = (e) => {
    setLocation(e.target.value)
  }

  // Handle the price input change
  const handlePriceChange = (e) => {
    setPrice(e.target.value)
  }

  // Handle the search button click
  const handleSearch = () => {
    // Mock search logic (you can replace it with actual search logic)
    const results = [
      {
        id: 1,
        location: 'New York',
        price: 150000,
      },
      {
        id: 2,
        location: 'Los Angeles',
        price: 250000,
      },
    ]

    // Filter results based on location and price
    const filteredResults = results.filter(
      (result) =>
        (location === '' ||
          result.location.toLowerCase().includes(location.toLowerCase())) &&
        (price === '' || result.price <= parseInt(price))
    )

    setSearchResults(filteredResults)
  }

  return (
    <div className='search-term'>
      <div className='form-group'>
        <label htmlFor='location'>Location:</label>
        <input
          type='text'
          id='location'
          value={location}
          onChange={handleLocationChange}
          placeholder='Enter location'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='price'>Price:</label>
        <input
          type='number'
          id='price'
          value={price}
          onChange={handlePriceChange}
          placeholder='Enter maximum price'
        />
      </div>
      <button onClick={handleSearch} className='button-search '>
        Search
      </button>
    </div>
  )
}

export default SearchTerm
