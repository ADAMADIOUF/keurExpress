import React from 'react'
import { useGetAgentByIdQuery } from '../slices/agentApiSlice'
import { useParams } from 'react-router-dom'
import Error from '../components/Error'
import Loading from '../components/Loading'
import HeroReusable from '../components/HeroResuable'
import { FaFacebook, FaInstagram } from 'react-icons/fa' // Importer les icônes pour les réseaux sociaux

const SingleAgent = () => {
  const { id: agentId } = useParams()

  const {
    data: agent,
    error,
    isLoading,
    refetch,
  } = useGetAgentByIdQuery(agentId)

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <Error
        message="Échec du chargement des détails de l\'agent."
        action={
          <button
            onClick={refetch}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Réessayer
          </button>
        }
      />
    )
  }

  if (!agent) {
    return <Error message="Détails de l\'agent non trouvés." />
  }

  return (
    <div className='singleAgent'>
      <HeroReusable
        title={agent.name}
        subtitle={agent.profession}
        description={agent.description}
      />

      <div className='agent-details-container'>
        <div className='agent-info'>
          <img src={agent.image} alt='' />
          <h2>À propos de {agent.name}</h2>
          <p>{agent.about}</p>
          <p>
            <strong>Adresse :</strong> {agent.address}
          </p>
          <p>
            <strong>Contact :</strong> {agent.contactEmail}
          </p>
          <p>
            <strong>Téléphone :</strong> {agent.contactNumber}
          </p>
        </div>

        <div className='social-media'>
          {agent.socialMedia?.facebook && (
            <a
              href={agent.socialMedia.facebook}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaFacebook size={24} />
            </a>
          )}
          {agent.socialMedia?.instagram && (
            <a
              href={agent.socialMedia.instagram}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaInstagram size={24} />
            </a>
          )}
        </div>

        <div className='agent-websiteSingle'>
          {agent.website && (
            <a href={agent.website} target='_blank' rel='noopener noreferrer'>
              Visiter le site
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleAgent
