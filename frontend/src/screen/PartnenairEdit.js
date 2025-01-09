import React, { useState, useEffect } from 'react'
import {
  useGetPartnerByIdQuery,
  useUpdatePartnerMutation,
} from '../slices/partnerSlice'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'

const defaultImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT3x1BvPu4atFWoo5z05tQ3eu2Bv6Gnq8f1A&s'

const PartnenairEdit = () => {
  const { id: partnerId } = useParams()
  const navigate = useNavigate()

  // Fetch the partner data using the partnerId
  const { data: partner, error, isLoading } = useGetPartnerByIdQuery(partnerId)
  const [updatePartner] = useUpdatePartnerMutation()

  // Local state for the form data
  const [partnerData, setPartnerData] = useState({
    name: '',
    contactNumber: '',
    contactEmail: '',
    address: '',
    profession: '',
    description: '',
    socialMedia: {
      facebook: '',
      instagram: '',
    },
    website: '',
    about: '',
    image: defaultImage,
  })

  // Set the partner data to state once it's fetched
  useEffect(() => {
    if (partner) {
      setPartnerData({
        name: partner.name,
        contactNumber: partner.contactNumber,
        contactEmail: partner.contactEmail,
        address: partner.address,
        profession: partner.profession,
        description: partner.description,
        socialMedia: {
          facebook: partner.socialMedia?.facebook || '',
          instagram: partner.socialMedia?.instagram || '',
        },
        website: partner.website,
        about: partner.about,
        image: partner.image || defaultImage,
      })
    }
  }, [partner])

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setPartnerData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Handle the image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPartnerData((prevData) => ({
          ...prevData,
          image: reader.result, // This stores the base64 string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle the submit event to update the partner
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await updatePartner({ id: partnerId, ...partnerData })
      toast.success('Partner updated successfully')
      navigate('/admin/partnerList') // Navigate back to the partners list
    } catch (error) {
      toast.error('Failed to update the partner')
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
      <h1>Edit Partner</h1>

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Name</label>
          <input
            type='text'
            name='name'
            value={partnerData.name}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Contact Number</label>
          <input
            type='text'
            name='contactNumber'
            value={partnerData.contactNumber}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Contact Email</label>
          <input
            type='email'
            name='contactEmail'
            value={partnerData.contactEmail}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Address</label>
          <input
            type='text'
            name='address'
            value={partnerData.address}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Profession</label>
          <input
            type='text'
            name='profession'
            value={partnerData.profession}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Description</label>
          <textarea
            name='description'
            value={partnerData.description}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Facebook</label>
          <input
            type='url'
            name='socialMedia.facebook'
            value={partnerData.socialMedia.facebook}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Instagram</label>
          <input
            type='url'
            name='socialMedia.instagram'
            value={partnerData.socialMedia.instagram}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Website</label>
          <input
            type='url'
            name='website'
            value={partnerData.website}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>About</label>
          <textarea
            name='about'
            value={partnerData.about}
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
          {partnerData.image && (
            <img
              src={partnerData.image}
              alt='Partner'
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          )}
        </div>

        <button type='submit' className='btn btn-primary'>
          Update Partner
        </button>
      </form>
    </div>
  )
}

export default PartnenairEdit
