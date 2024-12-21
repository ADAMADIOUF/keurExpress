import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetPropertieByIdQuery } from '../slices/propertieSlice'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Map from '../components/Map'
import HeroReusable from '../components/HeroResuable'

const SinglePropertie = () => {
  const { id: propertieId } = useParams()
 const [mainImage, setMainImage] = useState('')
  const {
    data: propertie,
    error,
    isLoading,
    refetch,
  } = useGetPropertieByIdQuery(propertieId)



  const handleThumbnailImageClick = (image) => {
    setMainImage(image)
  }
  if (!propertieId) {
    return <Error message='Property ID is missing!' />
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <Error
        message='Failed to load property details.'
        action={
          <button
            onClick={refetch}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        }
      />
    )
  }
  console.log('Propertie data:', propertie)

  if (!propertie) {
    return <Error message='Property details not found.' />
  }

  return (
    <div className='singlePropertie'>
      <HeroReusable
        title={'Property Details'}
        titleTwo={propertie.data.title}
        description={propertie.data.description}
      />
      <div className='singlePropertie-details section-center'>
        <div className='singlepropertie-big-img'>
          <img
            src={mainImage || propertie?.data?.images[0]}
            alt={propertie?.data?.title}
          />
        </div>
        <div className='fisrt-details'>
          <article>
            <p>Per Month</p>
            <p>{propertie?.data?.price} </p>
          </article>
          <article>
            <p>Location</p>
            <p>
              {propertie?.data?.location.city},{' '}
              {propertie?.data?.location.address}
            </p>
          </article>
          <article>
            <p>Type</p>
            <p>{propertie?.data?.propertyType}</p>
          </article>
          <article>
            <p>Size</p>
            <p>{propertie?.data?.size} sq ft</p>
          </article>
          <article>
            <p>Bathrooms</p>
            <p>{propertie?.data?.bathrooms}</p>
          </article>
          <article>
            <p>Bedrooms</p>
            <p>{propertie?.data?.bedrooms}</p>
          </article>
          <article>
            <p>Garage</p>
            <p>{propertie?.data?.garage ? 'Yes' : 'No'}</p>
          </article>
          <article>
            <p>Status</p>
            <p>{propertie?.data?.status}</p>
          </article>
        </div>
        <hr />
        <h1>{propertie?.data?.title}</h1>
        <p>{propertie?.data?.description}</p>

        {/* Additional Information */}
        <article>
          <p>Posted on</p>
          <p>{new Date(propertie?.data?.datePosted).toLocaleDateString()}</p>
        </article>
        <article>
          <p>Last updated</p>
          <p>{new Date(propertie?.data?.updatedAt).toLocaleDateString()}</p>
        </article>

        {/* If images are available, display them */}
        {propertie?.data?.images && propertie.data.images.length > 0 && (
          <div className='property-images'>
            <h3>Images:</h3>
            {propertie.data.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Property ${index + 1}`}
                className={`thumbnail ${
                  mainImage === image ? 'thumbnail-active' : ''
                }`}
                onClick={() => handleThumbnailImageClick(image)}
                style={{ cursor: 'pointer', width: '100px', height: '100px' }}
              />
            ))}
          </div>
        )}

        <div className='map-container'>
          <Map
            lng={propertie?.data?.location.lng}
            lat={propertie?.data?.location.lat}
            title={propertie?.data?.title}
          />
        </div>
      </div>
    </div>
  )
}

export default SinglePropertie
