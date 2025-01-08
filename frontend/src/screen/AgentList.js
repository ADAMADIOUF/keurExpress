import React, { useState } from 'react'
import {
  useCreateAgentsMutation,
  useGetAgentsQuery,
  useDeleteAgentMutation,
} from '../slices/agentApiSlice'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Error from '../components/Error'
import Loading from '../components/Loading'

const AgentList = () => {
  const { data: agents, error, isLoading, refetch } = useGetAgentsQuery()
  const [createAgent, { isLoading: loadingCreate }] = useCreateAgentsMutation()
  const [deleteAgent, { isLoading: loadingDelete }] = useDeleteAgentMutation()

  const [newAgentData, setNewAgentData] = useState({
    name: '',
    address: '',
    profession: '',
    contactNumber: '',
    contactEmail: '',
    description: '',
    socialMedia: {
      facebook: '',
      instagram: '',
    },
    website: '',
    about: '',
    image: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewAgentData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const createAgentHandler = async () => {
    // Set the agent data you want to send
    const newAgent = {
      name: 'John Doe',
      address: '123 Main Street',
      profession: 'Real Estate Agent',
      contactNumber: '+221123456789',
      contactEmail: 'johndoe@example.com',
      description: 'Experienced real estate agent with a great portfolio.',
      socialMedia: {
        facebook: 'https://facebook.com/johndoe',
        instagram: 'https://instagram.com/johndoe',
      },
      website: 'https://johndoe.com',
      about: 'I have been in the real estate business for over 10 years.',
      image:
        'https://www.shutterstock.com/image-photo/young-african-businessman-real-estate-600nw-2125825859.jpg',
    }

    if (window.confirm('Êtes-vous sûr de vouloir créer un nouvel agent ?')) {
      try {
        // Send the new agent data to the backend
        await createAgent(newAgent)
        refetch() // Refresh the agents list
        toast.success('Agent créé avec succès')
        setNewAgentData({}) // Reset the form after successful submission
      } catch (error) {
        toast.error("Échec de la création de l'agent")
      }
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet agent ?')) {
      try {
        await deleteAgent(id)
        refetch()
        toast.success('Agent supprimé avec succès')
      } catch (error) {
        toast.error('Échec de la suppression de l\'agent')
      }
    }
  }

  if (isLoading || loadingCreate || loadingDelete) {
    return <Loading />
  }

  if (error) {
    return <Error message='Erreur lors du chargement des agents.' />
  }

  return (
    <div className='container'>
      <div className='header'>
        <h1>Liste des agents</h1>
        <button
          onClick={createAgentHandler}
          disabled={loadingCreate}
          className='btn btn-primary'
        >
          {loadingCreate ? 'Création en cours...' : 'Créer un agent'}
        </button>
      </div>

      {loadingDelete && <Loading message="Suppression de l\'agent..." />}

      <div className='agent-list property-list no-wrap'>
        {agents?.length === 0 ? (
          <p>Aucun agent trouvé</p>
        ) : (
          agents?.map((agent) => (
            <div key={agent._id} className='agent-card'>
              <img
                src={agent.image || 'https://via.placeholder.com/150'}
                alt={agent.name}
                className='agent-image'
              />
              <div className='agent-info'>
                <h2>{agent.name}</h2>
                <p>{agent.profession}</p>
                <p>{agent.address}</p>
                <p>{agent.contactEmail}</p>
                <p>{agent.contactNumber}</p>

                {agent.socialMedia && (
                  <div className='social-media'>
                    {agent.socialMedia.facebook && (
                      <a
                        href={agent.socialMedia.facebook}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Facebook
                      </a>
                    )}
                    {agent.socialMedia.instagram && (
                      <a
                        href={agent.socialMedia.instagram}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Instagram
                      </a>
                    )}
                  </div>
                )}

                <p>{agent.website}</p>
                <p>{agent.about}</p>
              </div>

              <div className='agent-actions'>
                <Link
                  to={`/admin/agentList/${agent._id}/edit`}
                  className='btn btn-edit'
                >
                  <FaEdit /> Modifier
                </Link>
                <button
                  onClick={() => handleDelete(agent._id)}
                  className='btn btn-delete'
                  disabled={loadingDelete}
                >
                  <FaTrash /> Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AgentList
