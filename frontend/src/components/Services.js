import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TfiAngleDoubleDown } from 'react-icons/tfi'
import { FaPlay, FaTimes } from 'react-icons/fa'
import placeholderImage from '../assets/keurexpress.png' // Replace with your image path
import v from '../assets/keurexpress.mp4' // Replace with your video path

const Services = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const handlePlayVideo = () => {
    setIsVideoOpen(true)
  }

  const handleCloseVideo = () => {
    setIsVideoOpen(false)
  }

  return (
    <motion.div
      className='services'
      initial={{ opacity: 0, y: -50 }} // Starting state
      animate={{ opacity: 1, y: 0 }} // Ending state
      transition={{ duration: 1, ease: 'easeOut' }} // Animation duration and easing
    >
      <div className='container-services section-center'>
        {/* Service Details */}
        <motion.article
          className='services-details'
          initial={{ opacity: 0, x: -50 }} // Slide in from the left
          whileInView={{ opacity: 1, x: 0 }} // Visible when in view
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }} // Animation triggers once
        >
          <article className='hero-details'>
            <div className='hero-content'>
              <div className='dote'></div>
              <span className='hero-text'>Ce qui distingue Keur Express</span>
            </div>
            {/* Service Cards */}
            {[
              {
                title: 'Solutions Personnalisées',
                description:
                  'Nous élaborons des stratégies sur mesure pour répondre à vos besoins et objectifs spécifiques, garantissant des résultats exceptionnels.',
              },
              {
                title: 'Communication Claire',
                description:
                  'Nous privilégions une communication ouverte et honnête, en vous tenant informé et impliqué à chaque étape.',
              },
              {
                title: 'Innovation de Pointe',
                description:
                  'En utilisant des technologies avancées et des outils modernes, nous proposons des solutions innovantes pour un avantage concurrentiel.',
              },
            ].map((service, index) => (
              <motion.div
                className='services-content'
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3>
                  <span>
                    <TfiAngleDoubleDown />
                  </span>
                  {service.title}
                </h3>
                <p>{service.description}</p>
              </motion.div>
            ))}
          </article>
        </motion.article>

        {/* Video Section */}
        <motion.article
          className='services-video'
          initial={{ opacity: 0, x: 50 }} // Slide in from the right
          whileInView={{ opacity: 1, x: 0 }} // Visible when in view
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {!isVideoOpen ? (
            <div className='video-placeholder' onClick={handlePlayVideo}>
              <img
                src={placeholderImage}
                alt='Video Placeholder'
                className='placeholder-img'
              />
              <motion.button
                className='play-button'
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                <span className='flame'></span>
                <FaPlay />
              </motion.button>
            </div>
          ) : (
            <div className='video-container'>
              <button className='close-button' onClick={handleCloseVideo}>
                <FaTimes />
              </button>
              <motion.video
                controls
                autoPlay
                className='video-element'
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <source src={v} type='video/mp4' />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </motion.video>
            </div>
          )}
        </motion.article>
      </div>
    </motion.div>
  )
}

export default Services
