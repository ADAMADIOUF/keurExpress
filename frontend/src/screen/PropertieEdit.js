import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  useGetPropertieByIdQuery,
  useUpdatePropertieMutation,
} from '../slices/propertieSlice'
import Map from '../components/Map' 

const defaultImage =
  'https://cdn.prod.website-files.com/66a62e99c9fbe25684dce4d9/66a77d42a9add2f627785f17_Property%20Thumbnail-3.jpg'

const PropertieEdit = () => {
    const [imagePreview, setImagePreview] = useState('')
  const { id: propertieId } = useParams()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(25000)
  const [images, setImages] = useState([])
  const [location, setLocation] = useState({
    city: '',
    address: '',
    lat: '',
    lng: '',
    map_url: '',
  })
  const [userProfile, setUserProfile] = useState({
    name: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phoneNumber: '+221123456789',
    profileImage: 'https://example.com/profile.jpg',
  })
  const [status, setStatus] = useState('For Sale')
  const [propertyType, setPropertyType] = useState('')
  const [description, setDescription] = useState('')
   const [livingrooms, setLivingrooms] = useState(1)
  const [bedrooms, setBedrooms] = useState(5)
  const [bathrooms, setBathrooms] = useState(4)
  const [size, setSize] = useState(3500)
  const [garage, setGarage] = useState(false)
  const [store, setStore] = useState(false)
  const [isFeatured, setIsFeatured] = useState(false)
  const navigate = useNavigate()
  const {
    data: propertie,
    error,
    isLoading,
  } = useGetPropertieByIdQuery(propertieId)

  const [updatedProduct, { isLoading: updating }] = useUpdatePropertieMutation()

  useEffect(() => {
    if (propertie) {
      setTitle(propertie.title)
      setPrice(propertie.price)
      setImages(propertie.images || [])
      setLocation(
        propertie.location || {
          city: '',
          address: '',
          lat: '',
          lng: '',
          map_url: '',
        }
      )
      setStatus(propertie.status)
      setPropertyType(propertie.propertyType)
      setDescription(propertie.description)
      setLivingrooms(propertie.livingrooms || 1)
      setBedrooms(propertie.bedrooms || 5)
      setBathrooms(propertie.bathrooms || 4)
      setSize(propertie.size || 3500)
      setGarage(propertie.garage || false)
      setStore(propertie.store || false)
      setIsFeatured(propertie.isFeatured || false)
    }
  }, [propertie])

  const submitHandler = async (e) => {
    e.preventDefault()

    const updatedProperty = {
      propertieId,
      title,
      description,
      price,
      location,
      images,
      status,
      propertyType,
      livingrooms,
      bedrooms,
      bathrooms,
      size,
      garage,
      store,
      isFeatured,
      userProfile

      }
    const result = await updatedProduct(updatedProperty)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Product updated')
      navigate('/admin/propertiesList')
    }
  }

  const uploadFileHandler = (e) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files)
      const readerPromises = fileArray.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.readAsDataURL(file)
          })
      )

      Promise.all(readerPromises)
        .then((fileDataUrls) => {
          setImages((prevImages) => [...prevImages, ...fileDataUrls])
          toast.success('Files uploaded successfully!', {
            position: 'top-right', // Use the position string
          })
        })
        .catch((error) => {
          toast.error('Failed to upload files.', {
            position: 'top-right', // Use the position string
          })
          console.error(error)
        })
    }
  }

  const deleteImageHandler = (index) => {
    const updatedImages = images.filter((_, i) => i !== index)
    setImages(updatedImages)
  }
const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
      setUserProfile({
        ...userProfile,
        profileImage: reader.result, // Store the image data URL
      })
    }
    reader.readAsDataURL(file)
  }
}
  const handleCityChange = (e) => {
    const city = e.target.value
    setLocation((prevLocation) => ({
      ...prevLocation,
      city,
    }))
  }

  const handleAddressChange = (e) => {
    const address = e.target.value
    setLocation((prevLocation) => ({
      ...prevLocation,
      address,
    }))
  }

  // Generate full address dynamically with city and country
  const getFullAddress = () => {
    return `${location.address}, ${location.city}, Senegal`
  }

  if (isLoading) return <div>Loading...</div>
  if (error)
    return <div>Error: {error?.data?.message || 'An error occurred'}</div>

  return (
    <div className='container'>
      <h1>Modifier la propriété</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='title'>Titre</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='price'>Prix</label>
          <input
            type='number'
            id='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='locationCity'>Ville</label>
          <input
            type='text'
            id='locationCity'
            value={location.city}
            onChange={handleCityChange}
            required
          />
        </div>

        <div>
          <label htmlFor='locationAddress'>Adresse</label>
          <input
            type='text'
            id='locationAddress'
            value={location.address}
            onChange={handleAddressChange}
            required
          />
        </div>

        <div>
          <label htmlFor='fullAddress'>Adresse complète</label>
          <input
            type='text'
            id='fullAddress'
            value={getFullAddress()}
            readOnly
          />
        </div>

        <Map city={location.city} address={location.address} title={title} />

        <div>
          <label htmlFor='images'>Images</label>
          <input
            type='file'
            id='images'
            accept='image/*'
            onChange={uploadFileHandler}
            multiple
          />
          {images.length > 0 ? (
            <div className='image-preview'>
              {images.map((image, index) => (
                <div key={index} className='image-item'>
                  <img
                    src={image || defaultImage}
                    alt={`Thumbnail ${index + 1}`} // More descriptive
                    className='img-thumbnail'
                  />

                  <button
                    type='button'
                    className='btn-delete'
                    onClick={() => deleteImageHandler(index)}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className='image-preview'>
              <img
                src={defaultImage}
                alt='Par défaut'
                className='img-thumbnail'
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor='status'>Statut</label>
          <select
            id='status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value='For Sale'>À vendre</option>
            <option value='For Rent'>À louer</option>
          </select>
        </div>

        <div>
          <label htmlFor='propertyType'>Type de propriété</label>
          <select
            id='propertyType'
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            required
          >
            <option value=''>Sélectionnez un type</option>
            <option value='Villa'>Villa</option>
            <option value='Apartment'>Appartement</option>
            <option value='House'>Maison</option>
            <option value='Commercial'>Commercial</option>
            <option value='Land'>Terrain</option>
          </select>
        </div>

        <div>
          <label htmlFor='livingrooms'>Salons</label>
          <input
            type='number'
            id='livingrooms'
            value={livingrooms}
            onChange={(e) => setLivingrooms(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='bedrooms'>Chambres</label>
          <input
            type='number'
            id='bedrooms'
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='bathrooms'>Salles de bain</label>
          <input
            type='number'
            id='bathrooms'
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='size'>Surface (en m²)</label>
          <input
            type='number'
            id='size'
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='garage'>Garage</label>
          <input
            type='checkbox'
            id='garage'
            checked={garage}
            onChange={(e) => setGarage(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor='store'>Magasin</label>
          <input
            type='checkbox'
            id='store'
            checked={store}
            onChange={(e) => setStore(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor='isFeatured'>Est en vedette</label>
          <input
            type='checkbox'
            id='isFeatured'
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor='userName'>Prénom</label>
          <input
            type='text'
            id='userName'
            value={userProfile.name}
            onChange={(e) =>
              setUserProfile({ ...userProfile, name: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor='userLastName'>Nom de famille</label>
          <input
            type='text'
            id='userLastName'
            value={userProfile.lastName}
            onChange={(e) =>
              setUserProfile({ ...userProfile, lastName: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor='userEmail'>Email</label>
          <input
            type='email'
            id='userEmail'
            value={userProfile.email}
            onChange={(e) =>
              setUserProfile({ ...userProfile, email: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor='userPhone'>Numéro de téléphone</label>
          <input
            type='text'
            id='userPhone'
            value={userProfile.phoneNumber}
            onChange={(e) =>
              setUserProfile({ ...userProfile, phoneNumber: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor='profileImage'>Image de profil</label>

          <input
            type='file'
            id='profileImage'
            accept='image/*'
            onChange={handleImageUpload}
          />
          {imagePreview && (
            <div className='image-preview'>
              <img
                src={imagePreview}
                alt='Aperçu du profil'
                className='img-thumbnail'
                style={{ maxWidth: '150px', maxHeight: '150px' }}
              />
            </div>
          )}
        </div>
        <button
          type='button'
          className='btn-delete'
          onClick={() => setImagePreview(null)} // Reset image preview when clicked
        >
          Supprimer l'image
        </button>
        <div>
          <button type='submit' disabled={updating}>
            {updating ? 'Mise à jour...' : 'Mettre à jour la propriété'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PropertieEdit
