import React from 'react'
import { motion } from 'framer-motion'

const Missions = () => {
  return (
    <motion.div
      className='mission'
      initial={{ opacity: 0, y: -50 }} // Starting state
      animate={{ opacity: 1, y: 0 }} // Ending state
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
            {/* Mission Content */}
            <motion.div
              className='hero-content'
              initial={{ opacity: 0, y: -50 }} // Starting state
              animate={{ opacity: 1, y: 0 }} // Ending state
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div className='dote'></div>
              <span className='hero-text'>Our Mission</span>
              <h3>Empowering Your Real Estate Journey</h3>
              <p>
                To empower individuals and families to make informed real estate
                decisions and achieve their homeownership goals. We understand
                that buying or selling a home.
              </p>
            </motion.div>

            <motion.hr
              className='mission-line'
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* Mission Cards */}
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
                <h3>Client-Centric Approach</h3>
                <p>
                  Putting our clients' needs first is at the core of our
                  mission. We strive to understand your unique goals.
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
                <h3>Make Informed Decisions</h3>
                <p>
                  We believe in empowering our clients to make informed
                  decisions. Through clear communication.
                </p>
              </motion.div>
            </motion.div>
          </article>

          {/* Mission Image */}
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

        {/* Star Icon Animation */}
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
