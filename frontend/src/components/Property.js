import React from 'react'
import { useTranslation } from 'react-i18next' // Import i18next translation hook
import PropertieHome from '../pages/PropertieHome'

const Property = () => {
  const { t } = useTranslation() // Use the translation hook

  return (
    <div className='property'>
      <div className='section-center'>
        <div className='home-about-container'>
          <article className='home-about-details'>
            <div className='hero-content hero-home-about'>
              <div className='dote'></div>
              <span className='hero-text'>{t('property')}</span>{' '}
              {/* Translated text for 'Property' */}
              <h3>{t('findYourPerfectHome')}</h3>{' '}
              {/* Translated text for 'Find Your Perfect Home With Keur Express' */}
            </div>
          </article>
          <article className='home-about-content'>
            <p>
              {t('discoverHomes')} {/* Translated text for the description */}
            </p>
          </article>
        </div>
        <hr />
        <div className='properies-home'>
          <PropertieHome />
        </div>
      </div>
    </div>
  )
}

export default Property
