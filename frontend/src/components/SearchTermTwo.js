import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SearchTermTwo = () => {
  const navigate = useNavigate()
  const {
    keyword: urlKeyword,
    location: urlLocation,
    address: urlAddress,
    propertyType: urlPropertyType,
    minPrice: urlMinPrice,
    maxPrice: urlMaxPrice,
  } = useParams()

  const [keyword, setKeyword] = useState(urlKeyword || '')
  const [location, setLocation] = useState(urlLocation || '')
  const [address, setAddress] = useState(urlAddress || '')
  const [propertyType, setPropertyType] = useState(urlPropertyType || '')
  const [minPrice, setMinPrice] = useState(urlMinPrice || '')
  const [maxPrice, setMaxPrice] = useState(urlMaxPrice || '')

  // Update the state values when URL params change
  useEffect(() => {
    if (urlKeyword) setKeyword(urlKeyword)
    if (urlLocation) setLocation(urlLocation)
    if (urlAddress) setAddress(urlAddress)
    if (urlPropertyType) setPropertyType(urlPropertyType)
    if (urlMinPrice) setMinPrice(urlMinPrice)
    if (urlMaxPrice) setMaxPrice(urlMaxPrice)
  }, [
    urlKeyword,
    urlLocation,
    urlAddress,
    urlPropertyType,
    urlMinPrice,
    urlMaxPrice,
  ])

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault()
    if (
      keyword.trim() ||
      location.trim() ||
      address.trim() ||
      propertyType.trim() ||
      minPrice.trim() ||
      maxPrice.trim()
    ) {
      navigate(
        `/search/${keyword.trim()}/${location.trim()}/${address.trim()}/${propertyType.trim()}/${minPrice.trim()}/${maxPrice.trim()}`
      )
    } else {
      navigate('/') // Navigate to homepage if no search query is provided
    }
  }

  return (
    <div className='search-term'>
      <form onSubmit={submitHandler} className='search-container-two'>
        <input
          type='text'
          name='keyword'
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder='Search Houses...'
          className='search-input'
        />
        <input
          type='text'
          name='location'
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          placeholder='Location'
          className='search-input'
        />
        <input
          type='text'
          name='address'
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          placeholder='Address'
          className='search-input'
        />
        <input
          type='text'
          name='propertyType'
          onChange={(e) => setPropertyType(e.target.value)}
          value={propertyType}
          placeholder='Property Type'
          className='search-input'
        />
        <input
          type='number'
          name='minPrice'
          onChange={(e) => setMinPrice(e.target.value)}
          value={minPrice}
          placeholder='Min Price'
          className='search-input'
        />
        <input
          type='number'
          name='maxPrice'
          onChange={(e) => setMaxPrice(e.target.value)}
          value={maxPrice}
          placeholder='Max Price'
          className='search-input'
        />
        <button type='submit' className='search-button search-input'>
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchTermTwo
