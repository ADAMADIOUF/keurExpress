import React from 'react'
import {
  useAddPropertieMutation,
  useDeletePropertieMutation,
  useGetProperiesQuery,
} from '../slices/propertieSlice'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Error from '../components/Error'
import Loading from '../components/Loading'

const PropertieList = () => {
  const {
    keyword = '',
    location = '',
    address = '',
    propertyType = '',
    minPrice = '',
    maxPrice = '',
  } = useParams()

  const { data, error, isLoading, refetch } = useGetProperiesQuery({
    keyword,
    location,
    address,
    propertyType,
    minPrice,
    maxPrice,
  })

  const [createProperty, { isLoading: loadingCreate }] =
    useAddPropertieMutation()
  const [deleteProperty, { isLoading: loadingDelete }] =
    useDeletePropertieMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteProperty(id)
        refetch()
        toast.success('Property deleted successfully')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  const createPropertyHandler = async () => {
    const newProperty = {
      title: 'Luxury Villa',
      description: 'A beautiful villa with ocean view',
      price: 1500000,
      location: {
        city: 'Los Angeles',
        address: '123 Beach Road',
        lat: 34.052235,
        lng: -118.243683,
        map_url: 'https://maps.google.com',
      },
      images: [
        'https://cdn.prod.website-files.com/66a62e99c9fbe25684dce4d9/66a77ce1b423c8c8dc1647bc_Property%20Thumbnail-4.jpg',
        'https://cdn.prod.website-files.com/66a62e99c9fbe25684dce4d9/66a77ec820a8ddfa2bca7acc_Property%20Thumbnail-2.jpg',
      ],
      status: 'For Sale',
      propertyType: 'Villa',
      bedrooms: 5,
      bathrooms: 4,
      size: 3500,
      garage: true,
      store: false,
      userId: '676ebf2f5ef21954a9cd043a',
    }

    if (window.confirm('Are you sure you want to create a new property?')) {
      try {
        await createProperty(newProperty) // Pass the new property data
        refetch()
        toast.success('Property created successfully')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  if (isLoading) return <Loading />
  if (error)
    return <Error message={error?.data?.message || 'An error occurred'} />

  return (
    <div className='container'>
      <div className='header'>
        <h1>Property List</h1>
        <button
          onClick={createPropertyHandler}
          disabled={loadingCreate}
          className='btn btn-primary'
        >
          {loadingCreate ? 'Creating...' : 'Create Property'}
        </button>
      </div>

      {loadingDelete && <Loading message='Deleting property...' />}

      <div className='property-list'>
        {data?.data?.length === 0 ? (
          <p>No properties found</p>
        ) : (
          data?.data?.map((property) => (
            <div key={property._id} className='property-card'>
              <img
                src={property.images?.[0] || 'https://via.placeholder.com/150'}
                alt={property.title}
                className='property-image'
              />
              <div className='property-info'>
                <h2>{property.title}</h2>
                <p>{property.description}</p>
                <p>
                  <strong>Price:</strong> ${property.price}
                </p>
                <p>
                  <strong>Location:</strong> {property.location?.address},{' '}
                  {property.location?.city}
                </p>
                <p>
                  <strong>Bedrooms:</strong> {property.bedrooms} |{' '}
                  <strong>Bathrooms:</strong> {property.bathrooms}
                </p>
                <p>
                  <strong>Size:</strong> {property.size} sq ft
                </p>
              </div>
              <div className='property-actions'>
                <Link
                  to={`/admin/propertiesList/${property._id}/edit`}
                  className='btn btn-edit'
                >
                  <FaEdit /> Edit
                </Link>
                <button
                  onClick={() => deleteHandler(property._id)}
                  className='btn btn-delete'
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default PropertieList
