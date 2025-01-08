import React from 'react'
import { motion } from 'framer-motion'
import { FaCouch, FaHotTub, FaCheckCircle } from 'react-icons/fa'

const Approach = () => {
  return (
    <motion.div
      className='approach'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className='section-center'>
        <div className='approach-container'>
          <motion.article
            className='approach-img'
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a72f475de22c67fe75aae1_Our%20Approach%20Image.jpg'
              alt=''
              className='approach-img-first'
            />
            <div className='approach-details-img'>
              <motion.div
                className='approch-price'
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3>
                  $3699.00 <span></span>/Mois
                </h3>
              </motion.div>
              <div className='approach-content'>
                <h3>Orchard House</h3>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <h3>
                    <FaCouch /> <span>3</span>
                  </h3>
                  <h3>
                    <FaHotTub /> <span>3</span>
                  </h3>
                </motion.div>
              </div>
            </div>
          </motion.article>

          <motion.article
            className='approach-details'
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className='hero-content'>
              <motion.div
                className='dote'
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              />
              <span className='hero-text'>Notre Mission</span>
              <h3>Favoriser Votre Parcours Immobilier</h3>
              <p>
                Donner aux individus et aux familles les moyens de prendre des
                décisions immobilières éclairées et d'atteindre leurs objectifs
                de propriété. Nous comprenons que l'achat ou la vente d'une
                maison est un processus complexe.
              </p>
            </div>
            <div className='approach-listings'>
              <motion.div
                className='approch-listings-details'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div>
                  <span>
                    <FaCheckCircle />
                  </span>
                  <h3>Écouter Vos Besoins :</h3>
                </div>
                <p>
                  Nous commençons par écouter. Comprendre vos besoins
                  spécifiques, vos préférences et vos objectifs nous permet
                  d'adapter notre approche pour répondre à vos exigences
                  uniques.
                </p>
              </motion.div>
              <motion.div
                className='approch-listings-details'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div>
                  <span>
                    <FaCheckCircle />
                  </span>
                  <h3>Solutions Personnalisées :</h3>
                </div>
                <p>
                  Nous élaborons un plan personnalisé pour atteindre vos
                  objectifs, offrant des solutions pratiques et en accord avec
                  votre vision.
                </p>
              </motion.div>
            </div>
          </motion.article>
        </div>
      </div>
    </motion.div>
  )
}

export default Approach
