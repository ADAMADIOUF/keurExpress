import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  useGetPropertieByIdQuery,
  useUpdatePropertieMutation,
} from '../slices/propertieSlice'
const defaultImage =
  'https://cdn.prod.website-files.com/66a62e99c9fbe25684dce4d9/66a77d42a9add2f627785f17_Property%20Thumbnail-3.jpg'
const PropertieEdit = () => {
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
  const [status, setStatus] = useState('For Sale')
  const [propertyType, setPropertyType] = useState('')
  const [description, setDescription] = useState('')
const [bedrooms, setBedrooms] = useState(5)
const [bathrooms, setBathrooms] = useState(4)
const [size, setSize] = useState(3500)
const [garage, setGarage] = useState(false)
const [store, setStore] = useState(false)
const [isFeatured, setIsFeatured] = useState(false)

  const {
    data: propertie,
    error,
    isLoading,
  } = useGetPropertieByIdQuery(propertieId)

  const [updateProperty, { isLoading: updating }] = useUpdatePropertieMutation()

  useEffect(() => {
  if (propertie) {
    setTitle(propertie.title);
    setPrice(propertie.price);
    setImages(propertie.images || []);
    setLocation(
      propertie.location || {
        city: '',
        address: '',
        lat: '',
        lng: '',
        map_url: '',
      }
    );
    setStatus(propertie.status);
    setPropertyType(propertie.propertyType);
    setDescription(propertie.description);
    setBedrooms(propertie.bedrooms || 5);
    setBathrooms(propertie.bathrooms || 4);
    setSize(propertie.size || 3500);
    setGarage(propertie.garage || false);
    setStore(propertie.store || false);
    setIsFeatured(propertie.isFeatured || false);
  }
}, [propertie]);

  const submitHandler = async (e) => {
    e.preventDefault()

    const updatedProperty = {
      title,
      description,
      price,
      location,
      images,
      status,
      propertyType,
      bedrooms, // Use state values
      bathrooms, // Use state values
      size, // Use state values
      garage, // Use state values
      store, // Use state values
      isFeatured, // Use state values
      
    }

    try {
      await updateProperty({ propertieId, ...updatedProperty })
      toast.success('Property updated successfully')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
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

      Promise.all(readerPromises).then((fileDataUrls) => {
        setImages((prevImages) => [...prevImages, ...fileDataUrls])
      })
    }
  }
const deleteImageHandler = (index) => {
  const updatedImages = images.filter((_, i) => i !== index)
  setImages(updatedImages)
}


  if (isLoading) return <div>Loading...</div>
  if (error)
    return <div>Error: {error?.data?.message || 'An error occurred'}</div>

  return (
    <div className='container'>
      <h1>Edit Property</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='price'>Price</label>
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
          <label htmlFor='locationCity'>City</label>
          <input
            type='text'
            id='locationCity'
            value={location.city}
            onChange={(e) =>
              setLocation((prevLocation) => ({
                ...prevLocation,
                city: e.target.value,
              }))
            }
            required
          />
        </div>

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
                    alt={`Image ${index + 1}`}
                    className='img-thumbnail'
                  />
                  <button
                    type='button'
                    className='btn-delete'
                    onClick={() => deleteImageHandler(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className='image-preview'>
              <img src={defaultImage} alt='Default' className='img-thumbnail' />
            </div>
          )}
        </div>
        <div>
          <label htmlFor='status'>Status</label>
          <select
            id='status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value='For Sale'>For Sale</option>
            <option value='Sold'>Sold</option>
          </select>
        </div>

        <div>
          <label htmlFor='propertyType'>Property Type</label>
          <input
            type='text'
            id='propertyType'
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='bedrooms'>Bedrooms</label>
          <input
            type='number'
            id='bedrooms'
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='bathrooms'>Bathrooms</label>
          <input
            type='number'
            id='bathrooms'
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='size'>Size (sq ft)</label>
          <input
            type='number'
            id='size'
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='garage'>Has Garage</label>
          <input
            type='checkbox'
            id='garage'
            checked={garage}
            onChange={(e) => setGarage(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor='store'>Has Store</label>
          <input
            type='checkbox'
            id='store'
            checked={store}
            onChange={(e) => setStore(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor='isFeatured'>Is Featured</label>
          <input
            type='checkbox'
            id='isFeatured'
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
        </div>
        <button type='submit' disabled={updating}>
          {updating ? 'Updating...' : 'Update Property'}
        </button>
      </form>

      <Link to='/properties'>Back to Properties List</Link>
    </div>
  )
}

export default PropertieEdit
