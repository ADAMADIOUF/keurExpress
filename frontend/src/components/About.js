import React from 'react'
import { motion } from 'framer-motion'
import HeroReusable from './HeroResuable'
import HomeAbout from './HomeAbout'
import ChooseUs from './ChooseUs'
import Services from './Services'
import AgentsHeader from './AgentsHeader'
import Missions from './Missions'
import Approach from './Approach'
import BannerReusable from './BannerResubale'

const About = () => {
  return (
    <div className='about'>
      <div className='section-center'>
        <motion.div
          className='hero-content'
          initial={{ opacity: 0, y: -50 }} // Starting state
          animate={{ opacity: 1, y: 0 }} // Ending state
          transition={{ duration: 1, ease: 'easeOut' }} // Animation timing
        >
          <HeroReusable
            title={'À Propos de Nous'}
            subtitle={'Vivez votre expérience immobilière avec Keur Express'}
            description={
              'Chez Keur Express, nous nous engageons à simplifier votre parcours immobilier et à vous aider à trouver la maison parfaite.'
            }
          />
        </motion.div>
        <HomeAbout />
      </div>
      <ChooseUs />
      <Services />
      <div className='agent-about'>
        <article>
          <AgentsHeader />
        </article>
      </div>
      <Missions />
      <Approach />
      <BannerReusable
        image='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a1f24bfd8a60fbf773f029_Footer%20Top%20CTA%20Image.png' // Remplacer par une image pertinente pour À propos
        title='En savoir plus sur nous'
        description='Découvrez notre parcours, notre mission et nos valeurs qui poussent Keur Express à offrir l’excellence chaque jour.'
        target='/contact'
        label='Contactez-nous'
      />
    </div>
  )
}

export default About
