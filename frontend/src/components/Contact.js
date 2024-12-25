import React from 'react'
import HeroReusable from './HeroResuable'
import ContactEmail from './ContactEmail'
import ContactForm from './ContactForm'
import MapContact from './MapContact'
import BannerReusable from './BannerResubale'

const Contact = () => {
  return (
    <div className='contact'>
      <div className='section-center'>
        <HeroReusable
          title={'Contact Us'}
          subtitle={"Let's Start Your Real Estate Journey Together"}
          description={
            'Contact us today to explore your real estate options, ask questions, or schedule a consultation. Our team of expert agents is here to provide personalized.'
          }
        />
      </div>
      <div className='contact-emails'>
        <ContactEmail />
        <ContactForm />
      </div>
      <MapContact />
      <BannerReusable
        image='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a1f24bfd8a60fbf773f029_Footer%20Top%20CTA%20Image.png' // Replace with an image relevant to About
        title='Learn More About Us'
        description='Discover our journey, mission, and values that drive Keur Express to deliver excellence every day.'
        target='/about' // Route to navigate to
        label='More About Us' // Text for the button
      />
    </div>
  )
}

export default Contact
