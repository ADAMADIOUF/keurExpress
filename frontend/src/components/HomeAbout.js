import React, { useState } from 'react'
import { motion } from 'framer-motion' // Import motion
import Questions from './Questions'
import a from '../assets/homeabout.png'
import { FaBath, FaBed } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import AboutBtn from './AboutBtn'

const HomeAbout = () => {
  const [isImageMoving, setIsImageMoving] = useState(false) // Track image movement

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
            <h3>Elevate Your Real Estate Experience With Keur Express</h3>
          </div>
        </motion.article>
        <motion.article
          className='home-about-content'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <p>
            At Keur Express, we are committed to simplifying your real estate
            journey and helping you find the perfect home. With our dedicated
            team of experts.
          </p>
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
                <h3>$567.00/Month</h3>
                <p>New York City</p>
              </article>
              <article>
                <span>
                  <FaBed /> 3 Bed
                </span>
                <span>
                  <FaBath /> 2 Bath
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
