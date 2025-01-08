import React from 'react'
import { useGetAgentsQuery } from '../slices/agentApiSlice'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram } from 'react-icons/fa' // Import icons
import HeroReusable from '../components/HeroResuable'
import ChooseUs from '../components/ChooseUs'
import BannerReusable from '../components/BannerResubale'

const AllAgents = () => {
  const { data: agents, error, isLoading } = useGetAgentsQuery()

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error message='Failed to load agents.' />
  }

  const agentsList = agents || []

  return (
    <div className='agents-container'>
      <HeroReusable
  title={'Tous les Agents'}
  subtitle={'Conseillers Immobiliers de Confiance'}
  description={
    'Découvrez les professionnels dévoués derrière NestBes qui s’engagent à vous aider à naviguer sur le marché immobilier en toute confiance.'
  }
/>

      <div className='section-center'>
        <div className='agents-list'>
          {agentsList.length > 0 ? (
            agentsList.map((agent) => (
              <div key={agent._id} className='agent-card'>
                <Link to={`/agent/${agent._id}`}>
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className='agent-image'
                  />
                </Link>

                <div className='agent-details'>
                  <h2 className='agent-name'>
                    <Link to={`/agent/${agent._id}`}>{agent.name}</Link>
                  </h2>

                  <p className='agent-description'>{agent.description}</p>
                </div>

                <div className='agent-social-media-container'>
                  {/* Social media icons */}
                  <div className='social-icons'>
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
                  {/* Website Link */}
                  {agent.website && (
                    <div className='agent-website'>
                      <a
                        href={agent.website}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                  {/* View Details Link */}
                  <article className='agent-view-all'>
                    <Link to={`/agent/${agent._id}`}>View Details</Link>
                  </article>
                </div>
              </div>
            ))
          ) : (
            <p>No agents available</p>
          )}
        </div>
      </div>
      <ChooseUs />
      <BannerReusable
  image='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a1f24bfd8a60fbf773f029_Footer%20Top%20CTA%20Image.png'
  title='Trouvez la Maison de Vos Rêves ? Contactez-Nous Aujourd’hui !'
  description='Faites le premier pas vers la propriété en contactant notre équipe d’experts chez Keur Express.'
  target='/about' // Route pour naviguer
  label='En Savoir Plus Sur Nous'
/>

    </div>
  )
}

export default AllAgents
