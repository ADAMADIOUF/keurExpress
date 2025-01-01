import React from 'react'
import { motion } from 'framer-motion'

const HeroReusable = ({ title, titleTwo, description, subtitle }) => {
  return (
    <motion.section
      className='heroResuable'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        className='hero-content'
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className='dote'></div>
        <span className='hero-text'>{title}</span>
      </motion.div>
      <motion.div
        className='subtitle'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
      >
        {subtitle}
      </motion.div>
      <motion.div
        className='heroResuable-content'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
      >
        <h1 className='heroResuable-title'>{titleTwo}</h1>
        <p className='heroResuable-description'>{description}</p>
      </motion.div>
      <motion.div
        className='resuable-img'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.9 }}
      >
        <div className='img-resuable-1'>
          <img
            src='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/669395bc083f1fe4f7c61c51_Loop%20Line.svg'
            alt=''
          />
        </div>
        <div className='img-resuable-2'>
          <img
            src='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/669395be0581e8c6129db93e_Star%20Icon.svg'
            alt=''
          />
        </div>
      </motion.div>
    </motion.section>
  )
}

export default HeroReusable
