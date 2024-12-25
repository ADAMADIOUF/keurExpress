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

  // Check if properties data exists and is empty
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
        ))}
      </div>

      <div className='view-all'>
        <button className='btn-view'>
          <Link to={'/property'}>View All Properties</Link>
        </button>
      </div>
    </>
  )
}

export default PropertieHome
