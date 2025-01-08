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
    if (
      window.confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')
    ) {
      try {
        await deleteProperty(id)
        refetch()
        toast.success('Propriété supprimée avec succès')
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
        userProfile: {
          name: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
          phoneNumber: '+221123456789',
          profileImage: 'https://example.com/profile.jpg',
        },
        images: [
          'https://cdn.prod.website-files.com/66a62e99c9fbe25684dce4d9/66a77ce1b423c8c8dc1647bc_Property%20Thumbnail-4.jpg',
          'https://cdn.prod.website-files.com/66a62e99c9fbe25684dce4d9/66a77ec820a8ddfa2bca7acc_Property%20Thumbnail-2.jpg',
        ],
        status: 'For Sale',
        propertyType: 'Villa',
        livingrooms:2,
        bedrooms: 5,
        bathrooms: 4,
        size: 3500,
        garage: true,
        store: false,
        userId: '676ebf2f5ef21954a9cd043a',
      }

     if (
       window.confirm('Êtes-vous sûr de vouloir créer une nouvelle propriété ?')
     ) {
       try {
         await createProperty(newProperty) // Passer les données de la nouvelle propriété
         refetch()
         toast.success('Propriété créée avec succès')
       } catch (error) {
         toast.error(error?.data?.message || error.error)
       }
     }
    }
  if (isLoading) return <Loading />
  if (error)
    return <Error message={error?.data?.message || 'Une erreur est survenue'} />


  return (
    <div className='container'>
      <div className='header'>
        <h1>Liste des propriétés</h1>
        <button
          onClick={createPropertyHandler}
          disabled={loadingCreate}
          className='btn btn-primary'
        >
          {loadingCreate ? 'Création en cours...' : 'Créer une propriété'}
        </button>
      </div>

      {loadingDelete && <Loading message='Suppression de la propriété...' />}

      <div className='property-list'>
        {data?.data?.length === 0 ? (
          <p>Aucune propriété trouvée</p>
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
                  <strong>Prix :</strong> ${property.price}
                </p>
                <p>
                  <strong>Lieu :</strong> {property.location?.address},{' '}
                  {property.location?.city}
                </p>

                <p>
                  <p>
                    <strong>Salons :</strong> {property.livingrooms}
                  </p>
                  <p>
                    <strong>Chambres :</strong> {property.bedrooms}
                  </p>
                  <p>
                    <strong>Salles de bains :</strong> {property.bathrooms}
                  </p>
                </p>
                <p>
                  <strong>Surface :</strong> {property.size} m²
                </p>
                {property.userProfile ? (
                  <div className='user-profile'>
                    <img
                      src={
                        property.userProfile.profileImage ||
                        'https://static.vecteezy.com/system/resources/thumbnails/002/172/762/small_2x/house-front-view-illustration-free-vector.jpg'
                      }
                      alt={`${property.userProfile.name} ${property.userProfile.lastName}`}
                      className='profile-image'
                    />
                    <div className='profile-info'>
                      <h3>
                        {property.userProfile.name}{' '}
                        {property.userProfile.lastName}
                      </h3>
                      <p>
                        <strong>Email :</strong> {property.userProfile.email}
                      </p>
                      <p>
                        <strong>Téléphone :</strong>{' '}
                        {property.userProfile.phoneNumber}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p>Aucun profil utilisateur disponible</p>
                )}
              </div>
              <div className='property-actions'>
                <Link
                  to={`/admin/propertiesList/${property._id}/edit`}
                  className='btn btn-edit'
                >
                  <FaEdit /> Modifier
                </Link>
                <button
                  onClick={() => deleteHandler(property._id)}
                  className='btn btn-delete'
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

export default PropertieList
