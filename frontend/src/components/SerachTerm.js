import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const SearchTerm = () => {
  const navigate = useNavigate()
  const { t } = useTranslation() // Use the useTranslation hook to get translations

  // Destructure the params from the URL
  const {
    keyword: urlKeyword,
    location: urlLocation,
    address: urlAddress,
  } = useParams()

  // State to hold the values of keyword, location, and address
  const [keyword, setKeyword] = useState(urlKeyword || '')
  const [location, setLocation] = useState(urlLocation || '')
  const [address, setAddress] = useState(urlAddress || '')

  // Effect to update the states when params change in the URL
  useEffect(() => {
    if (urlKeyword) setKeyword(urlKeyword)
    if (urlLocation) setLocation(urlLocation)
    if (urlAddress) setAddress(urlAddress)
  }, [urlKeyword, urlLocation, urlAddress])

  // Handler for form submission
  const submitHandler = (e) => {
    e.preventDefault()

    // If keyword is provided, we need to check if location and address are given
    if (keyword.trim()) {
      // Case when only keyword is provided
      if (!location.trim() && !address.trim()) {
        navigate(`/search/${keyword.trim()}`) // Only navigate with keyword
      } else {
        // Case when keyword, location, and address are all provided
        navigate(
          `/search/${keyword.trim()}/${location.trim()}/${address.trim()}`
        )
      }
    } else {
      // If no keyword is entered, navigate to the properties page
      navigate('/property') // Navigate to the properties page (modify as needed)
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
          placeholder={t('search.placeholder_keyword')} // Use translation for keyword
          className='search-input'
        />
        <input
          type='text'
          name='location'
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          placeholder={t('search.placeholder_location')} // Use translation for location
          className='search-input'
        />
        <input
          type='text'
          name='address'
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          placeholder={t('search.placeholder_address')} // Use translation for address
          className='search-input'
        />
        <button type='submit' className='search-button search-input'>
          {t('search.button_search')} {/* Use translation for button */}
        </button>
      </form>
    </div>
  )
}

export default SearchTerm
