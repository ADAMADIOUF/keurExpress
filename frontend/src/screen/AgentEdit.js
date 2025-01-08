import React, { useState, useEffect } from 'react'
import {
  useGetAgentByIdQuery,
  useUpdateAgentMutation,
} from '../slices/agentApiSlice'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'

const defaultImage =
  'https://www.shutterstock.com/image-photo/young-african-businessman-real-estate-600nw-2125825859.jpg'

const AgentEdit = () => {
  const { id: agentId } = useParams()
  const navigate = useNavigate()

  // Fetch the agent data using the agentId
  const { data: agent, error, isLoading } = useGetAgentByIdQuery(agentId)
  const [updateAgent] = useUpdateAgentMutation()

  // Local state for the form data
  const [agentData, setAgentData] = useState({
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
    image: defaultImage,
  })

  // Set the agent data to state once it's fetched
  useEffect(() => {
    if (agent) {
      setAgentData({
        name: agent.name,
        address: agent.address,
        profession: agent.profession,
        contactNumber: agent.contactNumber,
        contactEmail: agent.contactEmail,
        description: agent.description,
        socialMedia: {
          facebook: agent.socialMedia?.facebook || '',
          instagram: agent.socialMedia?.instagram || '',
        },
        website: agent.website,
        about: agent.about,
        image: agent.image || defaultImage,
      })
    }
  }, [agent])

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setAgentData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Handle the image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // You can upload the file to a server here, or handle it locally
      const reader = new FileReader()
      reader.onloadend = () => {
        setAgentData((prevData) => ({
          ...prevData,
          image: reader.result, // This stores the base64 string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle the submit event to update the agent
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await updateAgent({ id: agentId, ...agentData })
      toast.success('Agent updated successfully')
      navigate('/admin/agentList') // Navigate back to the agents list
    } catch (error) {
      toast.error('Failed to update the agent')
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div className='container'>
      <h1>Edit Agent</h1>

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Name</label>
          <input
            type='text'
            name='name'
            value={agentData.name}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Address</label>
          <input
            type='text'
            name='address'
            value={agentData.address}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Profession</label>
          <input
            type='text'
            name='profession'
            value={agentData.profession}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Contact Number</label>
          <input
            type='text'
            name='contactNumber'
            value={agentData.contactNumber}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Contact Email</label>
          <input
            type='email'
            name='contactEmail'
            value={agentData.contactEmail}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Description</label>
          <textarea
            name='description'
            value={agentData.description}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Facebook</label>
          <input
            type='url'
            name='socialMedia.facebook'
            value={agentData.socialMedia.facebook}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Instagram</label>
          <input
            type='url'
            name='socialMedia.instagram'
            value={agentData.socialMedia.instagram}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Website</label>
          <input
            type='url'
            name='website'
            value={agentData.website}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>About</label>
          <textarea
            name='about'
            value={agentData.about}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Image Upload</label>
          <input
            type='file'
            onChange={handleImageChange}
            className='form-control'
          />
          {agentData.image && (
            <img
              src={agentData.image}
              alt='Agent'
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          )}
        </div>

        <button type='submit' className='btn btn-primary'>
          Update Agent
        </button>
      </form>
    </div>
  )
}

export default AgentEdit
