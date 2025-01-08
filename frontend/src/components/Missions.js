import React from 'react'
import { motion } from 'framer-motion'

const Missions = () => {
  return (
    <motion.div
      className='mission'
      initial={{ opacity: 0, y: -50 }} // État de départ
      animate={{ opacity: 1, y: 0 }} // État final
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className='section-center'>
        <motion.div
          className='missions-container'
          initial='hidden'
          animate='visible'
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <article>
            {/* Contenu de la mission */}
            <motion.div
              className='hero-content'
              initial={{ opacity: 0, y: -50 }} // État de départ
              animate={{ opacity: 1, y: 0 }} // État final
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div className='dote'></div>
              <span className='hero-text'>Notre Mission</span>
              <h3>Donner du pouvoir à votre parcours immobilier</h3>
              <p>
                Donner aux individus et aux familles les moyens de prendre des
                décisions immobilières éclairées et de réaliser leurs objectifs
                d'accession à la propriété. Nous comprenons que l'achat ou la
                vente d'une maison.
              </p>
            </motion.div>

            <motion.hr
              className='mission-line'
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* Cartes de mission */}
            <motion.div
              className='mission-card'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: 'easeOut',
                staggerChildren: 0.2,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img
                  src='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a7212b0799a98c7cf4300e_Mission%20Icon1.svg'
                  alt=''
                />
                <h3>Approche centrée sur le client</h3>
                <p>
                  Mettre les besoins de nos clients en premier est au cœur de
                  notre mission. Nous nous efforçons de comprendre vos objectifs
                  uniques.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img
                  src='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a7212b6920c9abb4a11e94_Mission%20Icon2.svg'
                  alt=''
                />
                <h3>Prendre des décisions éclairées</h3>
                <p>
                  Nous croyons en l'autonomisation de nos clients pour prendre
                  des décisions éclairées. Grâce à une communication claire.
                </p>
              </motion.div>
            </motion.div>
          </article>

          {/* Image de la mission */}
          <motion.article
            className='img-mission'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          >
            <img
              src='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a722bfcecdc90bea3537bd_Our%20Mission%20Image.jpg'
              alt=''
            />
          </motion.article>
        </motion.div>

        {/* Animation de l'icône en étoile */}
        <motion.div
          className='img-mission-absolute'
          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
        >
          <img
            src='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/669395be0581e8c6129db93e_Star%20Icon.svg'
            alt=''
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Missions
