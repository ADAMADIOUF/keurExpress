import React from 'react'
import { useGetAgentsQuery } from '../slices/agentApiSlice'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram } from 'react-icons/fa' // Import icons
import HeroReusable from '../components/HeroResuable'

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
        title={'All Agents'}
        subtitle={'Trusted Real Estate Advisors'}
        description={
          'Get to know the dedicated professionals behind NestBes who are committed to helping you navigate the real estate market with confidence'
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
    </div>
  )
}

export default AllAgents
