import React from 'react'
import HeroReusable from '../components/HeroResuable'

const partners = [
  {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdiq-yN1sljPpyVdvxjccvKNZ9QrQRkCYDnw&s',
    name: 'Partner 1',
    contactNumber: '+1 123 456 7890',
    email: 'contact@partner1.com',
  },
  {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT3x1BvPu4atFWoo5z05tQ3eu2Bv6Gnq8f1A&s',
    name: 'Partner 2',
    contactNumber: '+1 234 567 8901',
    email: 'contact@partner2.com',
  },
  {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCymhsu3wqlPbB3G8WgdhnZr7PMxZx9hu-Xw&spng',
    name: 'Partner 3',
    contactNumber: '+1 345 678 9012',
    email: 'contact@partner3.com',
  },
  {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs-InA73YejhhsMLAKdKAUCrP5Xkp1oWZhow&s',
    name: 'Partner 4',
    contactNumber: '+1 456 789 0123',
    email: 'contact@partner4.com',
  },
]

const Partenaire = () => {
  return (
    <div className='partenaire'>
      <div className='section-center'>
        <HeroReusable
  title={'Tous les Partenaires'}
  subtitle={'Nos Partenaires de Confiance'}
  description={
    'Rencontrez les entreprises et les professionnels qui collaborent avec nous pour offrir des services et solutions immobiliers exceptionnels, garantissant une expérience fluide et réussie.'
  }
/>

        <div className='partenaire-container'>
          <h2 className='partenaire-title'>Nos Partenaires</h2>
          <div className='partenaire-grid'>
            {partners.map((partner, index) => (
              <div className='partenaire-item' key={index}>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className='partenaire-logo'
                />
                <p>{partner.name}</p>
                <p className='contact-info'>Contact: {partner.contactNumber}</p>
                <p className='contact-info'>
                  Email: <a href={`mailto:${partner.email}`}>{partner.email}</a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Partenaire
