import React, { useEffect } from 'react'
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from '../slices/wishlistApiSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../components/Loading'
import Message from '../components/Error'

const WishlistScreen = () => {
  const navigate = useNavigate()
  const { data: wishlist, error, isLoading } = useGetWishlistQuery()
  const [removeFromWishlist, { isLoading: loadingRemove }] =
    useRemoveFromWishlistMutation()

  // Accessing userInfo from Redux store
  const { userInfo } = useSelector((state) => state.auth)

  const handleRemoveFromWishlist = async (propertyId) => {
    await removeFromWishlist(propertyId)
  }

  useEffect(() => {
    if (error) {
      console.error('Error fetching wishlist:', error)
    }
  }, [error])

  if (isLoading) {
    return <Loader />
  }

  // If no userInfo is available, prompt to add items to the wishlist
  if (!userInfo) {
    return (
      <Message variant='warning'>Please add items to your wishlist.</Message>
    )
  }

  // Handle different error situations more specifically
  if (error) {
    let errorMessage = 'An unexpected error occurred. Please try again later.'
    if (error?.data?.message) {
      errorMessage = error.data.message // More specific error message from the API
    }
    return <Message variant='danger'>{errorMessage}</Message>
  }

  return (
    <div className='wishlist-screen'>
      <h2>Your Wishlist</h2>
      {wishlist && wishlist.properties.length > 0 ? (
        <div className='wishlist-items'>
          {wishlist.properties.map((property) => (
            <div key={property._id} className='wishlist-item'>
              <img
                src={property.images[0]}
                alt={property.title}
                className='property-image'
              />
              <div className='property-info'>
                <h3>{property.title}</h3>
                <p>{property.description}</p>
                <p>Price: ${property.price}</p>
                <p>
                  {property.bedrooms} Bedrooms, {property.bathrooms} Bathrooms
                </p>
                <button
                  onClick={() => handleRemoveFromWishlist(property._id)}
                  disabled={loadingRemove}
                >
                  {loadingRemove ? 'Removing...' : 'Remove from Wishlist'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  )
}

export default WishlistScreen
