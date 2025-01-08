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
          title={'Contactez-Nous'}
          subtitle={'Commençons Votre Aventure Immobilière Ensemble'}
          description={
            'Contactez-nous dès aujourd’hui pour explorer vos options immobilières, poser vos questions ou planifier une consultation. Notre équipe d’agents experts est là pour vous offrir un service personnalisé.'
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
        title='En savoir plus sur nous'
        description="Découvrez notre parcours, notre mission et nos valeurs qui poussent Keur Express à offrir l'excellence chaque jour."
        target='/about'
        label='En savoir plus sur nous'
      />
    </div>
  )
}

export default Contact
