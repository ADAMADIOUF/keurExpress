import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetProperiesQuery } from '../slices/propertieSlice'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { useTranslation } from 'react-i18next' // Import the translation hook

const LastProperties = () => {
  const { keyword = '' } = useParams()
  const { t } = useTranslation() // Hook for translations

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
                <span className='hero-text'>{t('nearestProperty')}</span>
                <h3>{t('locateClosestProperty')}</h3>
              </div>
            </article>
            <article className='home-about-content'>
              <p>{t('propertyDescription')}</p>
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
                      {t('price')} ${property.price.toLocaleString()}
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
                        {t('viewOnMap')}
                      </a>
                    </div>

                    <div className='property-stats'>
                      <p>
                        <strong>{property.bedrooms}</strong> {t('bedrooms')}
                      </p>
                      <p>
                        <strong>{property.bathrooms}</strong> {t('bathrooms')}
                      </p>
                      <p>
                        <strong>{property.size}</strong> {t('sqft')}
                      </p>
                    </div>

                    <div className='property-status'>
                      <p>
                        {t('status')}: <strong>{property.status}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>{t('noProperties')}</p>
            )}
          </div>

          <div className='view-all'>
            <button className='btn-view'>
              <Link to={'/property'}>{t('viewAllProperties')}</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LastProperties
