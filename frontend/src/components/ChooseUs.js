import React from 'react'
import { motion } from 'framer-motion'
import HomeAboutSection from './HomeAboutSection'
import CardChooseUs from './CardChooseUs'
import ProgressBar from './ProgressBar'

const ChooseUs = () => {
  return (
    <motion.div
      className='choose-us'
      initial={{ opacity: 0, y: -50 }} // Starting state
      animate={{ opacity: 1, y: 0 }} // Ending state
      transition={{ duration: 1, ease: 'easeOut' }} // Animation duration and easing
    >
      <div className='section-center'>
        {/* Section Heading */}
        <HomeAboutSection
          heroText='Why Choose Us'
          heading='Why Choose Keur Express for Real Estate Partner'
          description="At Keur Express, we understand that choosing a real estate partner is a significant decision. Here's why we stand out from the rest."
        />
        <hr />
        {/* Features and Progress Indicators */}
        <CardChooseUs />
        <ProgressBar />
      </div>
    </motion.div>
  )
}

export default ChooseUs
