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
          heroText='Pourquoi Nous Choisir'
          heading='Pourquoi Choisir Keur Express comme Partenaire Immobilier'
          description='Chez Keur Express, nous comprenons que choisir un partenaire immobilier est une décision importante. Voici pourquoi nous nous démarquons des autres.'
        />

        <hr />
        
        <CardChooseUs />
        <ProgressBar />
      </div>
    </motion.div>
  )
}

export default ChooseUs
