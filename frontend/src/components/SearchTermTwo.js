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

  // Mettre à jour les valeurs de l'état lorsque les paramètres URL changent
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

  // Gestion de la soumission du formulaire
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
      navigate('/') // Naviguer vers la page d'accueil si aucune requête de recherche n'est fournie
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
          placeholder='Rechercher des maisons...'
          className='search-input'
        />
        <input
          type='text'
          name='location'
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          placeholder='Lieu'
          className='search-input'
        />
        <input
          type='text'
          name='address'
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          placeholder='Adresse'
          className='search-input'
        />
        <input
          type='text'
          name='propertyType'
          onChange={(e) => setPropertyType(e.target.value)}
          value={propertyType}
          placeholder='Type de propriété'
          className='search-input'
        />
        <input
          type='number'
          name='minPrice'
          onChange={(e) => setMinPrice(e.target.value)}
          value={minPrice}
          placeholder='Prix min'
          className='search-input'
        />
        <input
          type='number'
          name='maxPrice'
          onChange={(e) => setMaxPrice(e.target.value)}
          value={maxPrice}
          placeholder='Prix max'
          className='search-input'
        />
        <button type='submit' className='search-button search-input'>
          Rechercher
        </button>
      </form>
    </div>
  )
}

export default SearchTermTwo
