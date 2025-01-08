import React from 'react'
import { Link, useParams } from 'react-router-dom' // Import Link for navigation
import { useGetProperiesQuery } from '../slices/propertieSlice'
import Loading from '../components/Loading'
import Error from '../components/Error'
import HeroReusable from '../components/HeroResuable'
import SearchTermTwo from '../components/SearchTermTwo'

const AllProperties = () => {
   const {
       keyword = '',
       location = '',
       address = '',
       propertyType="",
       minPrice="",
       maxPrice="",
     } = useParams()
   
     // Query properties with keyword, location, and address as parameters
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
    return <Error message='Failed to load properties.' />
  }

  const propertyList = properties?.data || []
if (propertyList.length === 0) {
  return (
    <>
      <Link to='/' className='back-btn'>
        Go Back
      </Link>
      <Error variant='info'>No properties found</Error>
    </>
  )
}

  return (
    <>
      {keyword && (
        <Link to='/' className='back-btn'>
          Go Back
        </Link>
      )}
      <HeroReusable
        title={'Toutes les propriétés'}
        subtitle={'Trouvez votre maison idéale avec Keur Express'}
        description={
          'Découvrez une large gamme de maisons disponibles à la vente et à la location. Parcourez nos annonces sélectionnées ci-dessous pour trouver la propriété de vos rêves.'
        }
      />

      <div className='section-center'>
        <SearchTermTwo />
        <div className='property-list'>
          {propertyList.length > 0 ? (
            propertyList.map((property) => (
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
                    <Link to={`/propertie/${property._id}`}>
                      {property.title}
                    </Link>
                  </h2>

                  {/* Lien englobant la description */}
                  <p className='property-description'>
                    <Link to={`/propertie/${property._id}`}>
                      {property.description.substring(0, 40)}...
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
                </div>
              </div>
            ))
          ) : (
            <p>Aucune propriété disponible</p>
          )}
        </div>
      </div>
    </>
  )
}

export default AllProperties
