import React from 'react'
import { motion } from 'framer-motion' // Importing motion for animations

import a from '../assets/c1.png'
import b from '../assets/c2.png'
import c from '../assets/c3.png'
import d from '../assets/c4.png'
import e from '../assets/c5.png'

const Companies = () => {
 

  return (
    <div className='companies'>
      <div className='section-center'>
        <div className='companies-title'>
          <div className='line'></div>
          <h2
            dangerouslySetInnerHTML={{
              __html: ' Approuvé par plus de 1000 entreprises... ',
            }}
          />{' '}
          {/* Use translation for title */}
          <div className='line'></div>
        </div>

        <div className='container-companies'>
          {/* Adding motion.div to animate the images */}
          <motion.article
            className='companies-details'
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <img src={a} alt='' />
          </motion.article>
          <motion.article
            className='companies-details'
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <img src={b} alt='' />
          </motion.article>
          <motion.article
            className='companies-details'
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <img src={c} alt='' />
          </motion.article>
          <motion.article
            className='companies-details'
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <img src={d} alt='' />
          </motion.article>
          <motion.article
            className='companies-details'
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <img src={e} alt='' />
          </motion.article>
        </div>
      </div>
    </div>
  )
}

export default Companies
