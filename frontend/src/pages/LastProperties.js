import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetProperiesQuery } from '../slices/propertieSlice'
import Loading from '../components/Loading'
import Error from '../components/Error'

const LastProperties = () => {
  const { keyword = '' } = useParams()
 

  const {
    data: properties,
    error,
    isLoading,
  } = useGetProperiesQuery({ keyword })

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error message='Failed to load properties.' />
  }

  const propertyList = properties?.data || []

  return (
    <>
      <div className='property-last'>
        <div className='section-center'>
          <div className='home-about-container'>
            <article className='home-about-details'>
              <div className='hero-content hero-home-about'>
                <div className='dote'></div>
                <span className='hero-text'>{'Propriété la Plus Proche'}</span>
                <h3>{'Trouvez la Propriété la Plus Près de Chez Vous'}</h3>
              </div>
            </article>
            <article className='home-about-content'>
              <p>
                {
                  'Rencontrez les professionnels dédiés de Keur Express qui sont là pour vous aider à naviguer dans le marché immobilier en toute confiance.'
                }
              </p>
            </article>
          </div>

          <div className='property-list'>
            {propertyList.length > 0 ? (
              propertyList.slice(3, 6).map((property) => (
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

                    <p className='property-description'>
                      <Link to={`/propertie/${property._id}`}>
                        {property.description.substring(0, 40)}...
                      </Link>
                    </p>

                    <p className='property-price'>
                      {'price'} ${property.price.toLocaleString()}
                    </p>

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
                        {'viewOnMap'}
                      </a>
                    </div>

                    <div className='property-stats'>
                      <p>
                        <strong>{property.bedrooms}</strong> {'bedrooms'}
                      </p>
                      <p>
                        <strong>{property.bathrooms}</strong> {'bathrooms'}
                      </p>
                      <p>
                        <strong>{property.size}</strong> {'sqft'}
                      </p>
                    </div>

                    <div className='property-status'>
                      <p>
                        {'status'}: <strong>{property.status}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>{'noProperties'}</p>
            )}
          </div>

          <div className='view-all'>
            <button className='btn-view'>
              <Link to={'/property'}>{'Voir toutes les propriétés'}</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LastProperties
