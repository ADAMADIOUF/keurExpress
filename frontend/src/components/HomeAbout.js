import React, { useState } from 'react'
import { motion } from 'framer-motion' // Import motion
import { useTranslation } from 'react-i18next' // Import i18next translation hook
import Questions from './Questions'
import a from '../assets/homeabout.png'
import { FaBath, FaBed } from 'react-icons/fa'
import AboutBtn from './AboutBtn'

const HomeAbout = () => {
  const [isImageMoving, setIsImageMoving] = useState(false) // Track image movement
  const { t } = useTranslation() // Use the useTranslation hook to get translations

  return (
    <motion.div
      className='homeAbout section-center'
      initial={{ opacity: 0, y: -50 }} // Starting state
      animate={{ opacity: 1, y: 0 }} // Ending state
      transition={{ duration: 1, ease: 'easeOut' }} // Animation duration
    >
      {/* About Section */}
      <div className='home-about-container'>
        <motion.article
          className='home-about-details'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className='hero-content hero-home-about'>
            <div className='dote'></div>
            <span className='hero-text'>About Us</span>
            <h3>{t('homeAbout.title')}</h3>{' '}
            {/* Use translation for the title */}
          </div>
        </motion.article>
        <motion.article
          className='home-about-content'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <p>{t('homeAbout.description')}</p>{' '}
          {/* Use translation for the description */}
        </motion.article>
      </div>
      <hr />

      {/* Questions and Image Section */}
      <div className='container-questions'>
        <motion.article
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <Questions setIsImageMoving={setIsImageMoving} />
          <AboutBtn />
        </motion.article>
        <motion.article
          className={`home-about-img ${isImageMoving ? 'move' : ''}`}
          initial={{ opacity: 0, x: 100 }} // Starting state for image animation
          animate={{ opacity: 1, x: 0 }} // Ending state for image animation
          transition={{ duration: 1, ease: 'easeOut' }} // Animation duration for image
        >
          <img src={a} alt='Home' />
          <div className='details-home-about-img'>
            <div className='home-about-content-img'>
              <article>
                <h3>{t('homeAbout.price')}</h3>{' '}
                {/* Use translation for price */}
                <p>{t('homeAbout.location')}</p>{' '}
                {/* Use translation for location */}
              </article>
              <article>
                <span>
                  <FaBed /> {t('homeAbout.bedrooms')}
                </span>
                <span>
                  <FaBath /> {t('homeAbout.bathrooms')}
                </span>
              </article>
            </div>
          </div>
        </motion.article>
      </div>
    </motion.div>
  )
}

export default HomeAbout
