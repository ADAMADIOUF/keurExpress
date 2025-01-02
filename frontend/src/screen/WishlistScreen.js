import React, { useEffect } from 'react'
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from '../slices/wishlistApiSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loading'
import Message from '../components/Error'

const WishlistScreen = () => {
  const navigate = useNavigate()
  const { data: wishlist, error, isLoading } = useGetWishlistQuery()
  const [removeFromWishlist, { isLoading: loadingRemove }] =
    useRemoveFromWishlistMutation()

  console.log(wishlist, 'Wishlist Data')

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

  if (error) {
    return <Message variant='danger'>Failed to load wishlist</Message>
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
