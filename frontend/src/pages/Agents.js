import React from 'react'
import { useGetAgentsQuery } from '../slices/agentApiSlice'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram } from 'react-icons/fa' // Import icons
import { useTranslation } from 'react-i18next'

const Agents = () => {
  const { t } = useTranslation()
  const { data: agents, error, isLoading } = useGetAgentsQuery()

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error message={t('agents.errorMessage')} />
  }

  const agentsList = agents || []

  return (
    <div className='agents-container'>
      <div className='agents-list'>
        {agentsList.length > 0 ? (
          agentsList.slice(0, 3).map((agent) => (
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
                      {t('agentTwo.visitWebsite')}
                    </a>
                  </div>
                )}
                {/* View Details Link */}
                <article className='agent-view-all'>
                  <Link to={`/agent/${agent._id}`}>
                    {t('agentTwo.viewDetails')}
                  </Link>
                </article>
              </div>
            </div>
          ))
        ) : (
          <p>{t('agentTwo.noAgents')}</p>
        )}
      </div>

      <div className='view-all'>
        <button className='btn'>
          <Link to='/all-agents'>{t('agentTwo.viewAll')}</Link>
        </button>
      </div>
    </div>
  )
}

export default Agents
