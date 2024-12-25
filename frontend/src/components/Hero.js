import React from 'react'
import { motion } from 'framer-motion' // Importing motion from framer-motion
import { FaArrowDown, FaMapMarkerAlt } from 'react-icons/fa'

import bigimg from '../assets/hero1.png'
import a from '../assets/herorounded.png'
import b from '../assets/hero2.png'
import SearchTerm from './SerachTerm'
import ProgressBar from './ProgressBar'

const Hero = () => {
  const title = 'Beautiful Apartment'
  const price = '1500'
  const location = 'New York'

  return (
    <div className='hero section-center'>
      <div className='herocontainer'>
        <article className='hero-details'>
          <motion.div
            className='hero-content'
            initial={{ opacity: 0, y: -50 }} // Starting state
            animate={{ opacity: 1, y: 0 }} // Ending state
            transition={{ duration: 1, ease: 'easeOut' }} // Animation duration and easing
          >
            <div className='dote'></div>
            <span className='hero-text'>Find Your Dream Home</span>

            <h2>
              Discover Your Dream Home with{' '}
              <span className='hero-text-2'>Keur Express</span>
            </h2>
            <p>
              Embark on a journey to find your ideal living space with Keur
              Express. Explore a curated selection of properties.
            </p>
          </motion.div>

          <ProgressBar />
        </article>
        <article className='hero-image'>
          <motion.div
            className='big-img'
            initial={{ opacity: 0 }} // Start with opacity 0
            animate={{ opacity: 1 }} // Fade in
            transition={{ duration: 1, delay: 0.5 }} // Delay for smooth transition
          >
            <img src={bigimg} alt='Big Hero' />
          </motion.div>

          <motion.div
            className='first-hero-img'
            initial={{ opacity: 0, x: -100 }} // Start off-screen to the left
            animate={{ opacity: 1, x: 0 }} // Animate to original position
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <img src={a} alt='Hero Image' />
            <FaArrowDown className='arrow-icon' />
          </motion.div>

          <motion.div
            className='second-hero-img-content'
            initial={{ opacity: 0, y: 100 }} // Start from below
            animate={{ opacity: 1, y: 0 }} // Move to original position
            transition={{ duration: 1, delay: 1 }}
          >
            <img src={b} alt='Second Hero' className='second-hero-img' />

            <h2 className='title'>{title}</h2>
            <p className='price'>${price} per month</p>
            <div className='location'>
              <FaMapMarkerAlt className='location-icon' />
              <span className='location-name'>{location}</span>
            </div>
          </motion.div>
        </article>
      </div>
      <SearchTerm />
    </div>
  )
}

export default Hero
