import React from 'react'
import { motion } from 'framer-motion'
import Agents from '../pages/Agents'

const AgentsHeader = () => {
  return (
    <motion.div
      className='agents'
      initial={{ opacity: 0, y: 50 }} // Start hidden and below the viewport
      animate={{ opacity: 1, y: 0 }} // Fade in and move up
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className='section-center'>
        <motion.div
          className='home-about-container'
          initial={{ opacity: 0, x: -50 }} // Slide in from the left
          animate={{ opacity: 1, x: 0 }} // Slide to its original position
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Header Details */}
          <motion.article
            className='home-about-details'
            initial={{ opacity: 0, scale: 0.9 }} // Slightly smaller and hidden
            animate={{ opacity: 1, scale: 1 }} // Appear with a scaling effect
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className='hero-content hero-home-about'>
              <div className='dote'></div>
              <span className='hero-text'>Agent</span>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Your Trusted Real Estate Advisors
              </motion.h3>
            </div>
          </motion.article>

          {/* Description */}
          <motion.article
            className='home-about-content'
            initial={{ opacity: 0, y: 20 }} // Hidden and slightly below
            animate={{ opacity: 1, y: 0 }} // Fade in and move up
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            <p>
              Get to know the dedicated professionals behind Keur Express who
              are committed to helping you navigate the real estate market with
              confidence
            </p>
          </motion.article>
        </motion.div>

        {/* Agents Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <Agents />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AgentsHeader
