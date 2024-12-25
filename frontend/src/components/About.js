import React from 'react'
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
        <HeroReusable
          title={'About Us'}
          subtitle={'Get Your Real Estate Experience With Keur Express'}
          description={
            'At Keur Express,we are committed to simplifying your real estate journey and helping you find the perfect home.'
          }
        />
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
        image='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a1f24bfd8a60fbf773f029_Footer%20Top%20CTA%20Image.png' // Replace with an image relevant to About
        title='Learn More About Us'
        description='Discover our journey, mission, and values that drive Keur Express to deliver excellence every day.'
        target='/contact' 
        label=' Contact Us' 
      />
    </div>
  )
}

export default About
