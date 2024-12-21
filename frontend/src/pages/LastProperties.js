import React from 'react'
import { Link } from 'react-router-dom' // Import Link for navigation
import { useGetProperiesQuery } from '../slices/propertieSlice'
import Loading from '../components/Loading'
import Error from '../components/Error'

const LastProperties = () => {
  const { data: properties, error, isLoading } = useGetProperiesQuery()

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
                <span className='hero-text'>Nearest Property</span>
                <h3>Locate the Closest Property to You</h3>
              </div>
            </article>
            <article className='home-about-content'>
              <p>
                Get to know the dedicated professionals behind Keur Express who are
                committed to helping you navigate the real estate market with
                confidence
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

                    {/* Link wrapping the description */}
                    <p className='property-description'>
                      <Link to={`/propertie/${property._id}`}>
                        {property.description}
                      </Link>
                    </p>

                    {/* Property Price */}
                    <p className='property-price'>
                      Price: ${property.price.toLocaleString()}
                    </p>

                    {/* Property Location */}
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
                        View on map
                      </a>
                    </div>

                    {/* Property Stats */}
                    <div className='property-stats'>
                      <p>
                        <strong>{property.bedrooms}</strong> Bedrooms
                      </p>
                      <p>
                        <strong>{property.bathrooms}</strong> Bathrooms
                      </p>
                      <p>
                        <strong>{property.size}</strong> sq. ft
                      </p>
                    </div>

                    {/* Property Status */}
                    <div className='property-status'>
                      <p>
                        Status: <strong>{property.status}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No properties available</p>
            )}
          </div>
          <div className='view-all'>
            <button className='btn-view'>
              <Link to={'/all-properties'}>View All Properties</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LastProperties
