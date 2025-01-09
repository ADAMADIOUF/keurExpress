import React from 'react'
import HeroReusable from '../components/HeroResuable'
import { useGetPartnersQuery } from '../slices/partnerSlice'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram } from 'react-icons/fa' // Import icons

const Partenaire = () => {
  const { data: partners, error, isLoading } = useGetPartnersQuery()

  if (isLoading) return <Loading />
  if (error) return <Error message='Failed to load partners.' />

  return (
    <div className='partenaire'>
      <div className='section-center'>
        <HeroReusable
          title='Tous les Partenaires'
          subtitle='Nos Partenaires de Confiance'
          description='Rencontrez les entreprises et les professionnels qui collaborent avec nous pour offrir des services et solutions immobiliers exceptionnels, garantissant une expérience fluide et réussie.'
        />

        <div className='partenaire-container'>
          <h2 className='partenaire-title'>Nos Partenaires</h2>
          <div className='partenaire-grid'>
            {partners?.map((partner) => (
              <div className='partenaire-item' key={partner._id}>
                <img
                  src={partner.image}
                  alt={partner.name}
                  className='partenaire-logo'
                />
                <h3>{partner.name}</h3>
                <p className='profession'>{partner.profession}</p>
                <p className='description'>{partner.description}</p>
                <p className='address'>Adresse: {partner.address}</p>
                <p className='contact-info'>
                  Téléphone: {partner.contactNumber}
                </p>
                <p className='contact-info'>
                  Email:{' '}
                  <a href={`mailto:${partner.contactEmail}`}>
                    {partner.contactEmail}
                  </a>
                </p>
                <p className='website'>
                  Website:{' '}
                  <a
                    href={partner.website}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {partner.website}
                  </a>
                </p>
                <div className='social-media'>
                  {partner.socialMedia?.facebook && (
                    <a
                      href={partner.socialMedia.facebook}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='social-icon'
                    >
                      <FaFacebook />
                    </a>
                  )}
                  {partner.socialMedia?.instagram && (
                    <a
                      href={partner.socialMedia.instagram}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='social-icon'
                    >
                      <FaInstagram />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Partenaire
