import React from 'react'
import { Link, useParams } from 'react-router-dom' // Import Link for navigation
import { useGetProperiesQuery } from '../slices/propertieSlice'
import Loading from '../components/Loading'
import Error from '../components/Error'

const PropertieHome = () => {
  const {
    keyword = '',
    location = '',
    address = '',
    propertyType = '',
    minPrice = '',
    maxPrice = '',
  } = useParams()

  const {
    data: properties,
    error,
    isLoading,
  } = useGetProperiesQuery({
    keyword,
    location,
    address,
    propertyType,
    minPrice,
    maxPrice,
  })

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <Error message="Une erreur s'est produite. Veuillez réessayer plus tard." />
    )
  }

  const propertyList = properties?.data || []

  // Check if properties data exists and is empty
  if (propertyList.length === 0) {
    return (
      <>
        <Link to='/' className='back-btn'>
          Retourner à l'accueil
        </Link>
        <Error variant='info'>
          Aucune propriété trouvée. Retourner à l'accueil
        </Error>
      </>
    )
  }

  return (
    <>
      {keyword && (
        <Link to='/' className='back-btn'>
          Retourner à l'accueil
        </Link>
      )}

      <div className='property-list'>
        {propertyList.slice(0, 6).map((property) => (
          <div key={property._id} className='property-card'>
            <Link to={`/propertie/${property._id}`}>
              <img
                src={property.images[0]}
                alt={property.title}
                className='property-image'
              />
            </Link>

            <div className='property-details'>
              <h2 className='property-title'>
                <Link to={`/propertie/${property._id}`}>{property.title}</Link>
              </h2>

              <p className='property-description'>
                <Link to={`/propertie/${property._id}`}>
                  {property.description.substring(0, 50)}....
                </Link>
              </p>

              {/* Prix de la propriété */}
              <p className='property-price'>
                Prix : ${property.price.toLocaleString()}
              </p>

              {/* Localisation de la propriété */}
              <div className='property-location'>
                <p>
                  {property.location.city}, {property.location.address}
                </p>
                <a
                  href={property.location.map_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='property-map-link'
                >
                  Voir sur la carte
                </a>
              </div>

              {/* Statistiques de la propriété */}
              <div className='property-stats'>
                {property.bedrooms && (
                  <p>
                    <strong>{property.bedrooms}</strong> Chambres
                  </p>
                )}

                {property.bathrooms && (
                  <p>
                    <strong>{property.bathrooms}</strong> Salles de bain
                  </p>
                )}

                {property.livingrooms && (
                  <p>
                    <strong>{property.livingrooms}</strong> salons
                  </p>
                )}

                {property.size && (
                  <p>
                    <strong>{property.size}</strong> m²
                  </p>
                )}
              </div>

              {/* Statut de la propriété */}
              <div className='property-status'>
                <p>
                  Statut : <strong>{property.status}</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='view-all'>
        <button className='btn-view'>
          <Link to={'/property'}>Voir toutes les propriétés</Link>
        </button>
      </div>
    </>
  )
}

export default PropertieHome
