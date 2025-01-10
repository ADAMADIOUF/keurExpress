import React, { useEffect } from 'react'
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from '../slices/wishlistApiSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../components/Loading'
import Message from '../components/Error'

const WishlistScreen = () => {
  const navigate = useNavigate()
  const { data: wishlist, error, isLoading } = useGetWishlistQuery()
  const [removeFromWishlist, { isLoading: loadingRemove }] =
    useRemoveFromWishlistMutation()

  // Accès à userInfo depuis le store Redux
  const { userInfo } = useSelector((state) => state.auth)

  const handleRemoveFromWishlist = async (propertyId) => {
    await removeFromWishlist(propertyId)
  }

  useEffect(() => {
    if (error) {
      console.error('Erreur lors de la récupération de la wishlist:', error)
    }
  }, [error])

  if (isLoading) {
    return <Loader />
  }

  // Si aucun userInfo n'est disponible, inviter à ajouter des éléments à la wishlist
  if (!userInfo) {
    return (
      <Message variant='warning'>
        Veuillez ajouter des éléments à votre wishlist.
      </Message>
    )
  }

  // Gérer des erreurs spécifiques de manière plus détaillée
  if (error) {
    let errorMessage =
      'Une erreur inattendue est survenue. Veuillez réessayer plus tard.'
    if (error?.data?.message) {
      errorMessage = error.data.message // Message d'erreur plus spécifique provenant de l'API
    }
    return <Message variant='danger'>{errorMessage}</Message>
  }

  return (
    <div className='wishlist-screen'>
      <h2>Votre Wishlist</h2>
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
                <p>Prix : ${property.price}</p>
                <p>
                  {property.bedrooms} Chambres, {property.bathrooms} Salles de
                  bain
                </p>
                <button
                  onClick={() => handleRemoveFromWishlist(property._id)}
                  disabled={loadingRemove}
                >
                  {loadingRemove
                    ? 'Suppression en cours...'
                    : 'Retirer de la Wishlist'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Votre wishlist est vide.</p>
      )}
      <Link to={'/property'}>
        <button className='btn'>Retour à la propriété</button>
      </Link>
    </div>
  )
}

export default WishlistScreen
