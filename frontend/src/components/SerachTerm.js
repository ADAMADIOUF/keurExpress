import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SearchTerm = () => {
  const navigate = useNavigate()
  const {
    keyword: urlKeyword,
    location: urlLocation,
    address: urlAddress,
  } = useParams()
  const [keyword, setKeyword] = useState(urlKeyword || '')
  const [location, setLocation] = useState(urlLocation || '')
  const [address, setAddress] = useState(urlAddress || '')


  useEffect(() => {
    if (urlKeyword) setKeyword(urlKeyword)
    if (urlLocation) setLocation(urlLocation)
    if (urlAddress) setAddress(urlAddress)
  }, [urlKeyword, urlLocation, urlAddress])

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim() || location.trim() || address.trim()) {
      navigate(`/search/${keyword.trim()}/${location.trim()}/${address.trim()}`)
    } else {
      navigate('/') // Navigate to the homepage if no search query is provided
    }
  }

  return (
    <div className='search-term'>
      <form onSubmit={submitHandler} className='search-container'>
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
        <button type='submit' className='search-button search-input'>
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchTerm
