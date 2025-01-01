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
                  $3699.00 <span></span>/Month
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
              <span className='hero-text'>Our Mission</span>
              <h3>Empowering Your Real Estate Journey</h3>
              <p>
                To empower individuals and families to make informed real estate
                decisions and achieve their homeownership goals. We understand
                that buying or selling a home.
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
                  <h3>Listening to Your Needs:</h3>
                </div>
                <p>
                  We start by listening. Understanding your specific needs,
                  preferences, and objectives allows us to tailor our approach
                  to meet your unique requirements.
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
                  <h3>Customized Solutions:</h3>
                </div>
                <p>
                  We craft a personalized plan to address your goals, offering
                  solutions that are practical and aligned with your vision.
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
