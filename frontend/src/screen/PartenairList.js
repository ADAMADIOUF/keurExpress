import React, { useState } from 'react'
import {
  useCreatePartnersMutation,
  useDeletePartnerMutation,
  useGetPartnersQuery,
} from '../slices/partnerSlice'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Error from '../components/Error'
import Loading from '../components/Loading'

const PartenairList = () => {
  const { data: partners, error, isLoading, refetch } = useGetPartnersQuery()
  const [createPartner, { isLoading: loadingCreate }] =
    useCreatePartnersMutation()
  const [deletePartner, { isLoading: loadingDelete }] =
    useDeletePartnerMutation()

  const [newPartnerData, setNewPartnerData] = useState({
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
    image: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewPartnerData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleCreatePartner = async () => {
    const newPartner = {
      name: 'Example Partner',
      contactNumber: '123-456-7890',
      contactEmail: 'example@partner.com',
      address: '123 Main St, Anytown, USA',
      profession: 'Real Estate Consultant',
      description: 'A trusted partner for real estate solutions.',
      website: 'https://examplepartner.com',
      socialMedia: {
        facebook: 'https://facebook.com/examplepartner',
        instagram: 'https://instagram.com/examplepartner',
      },
      about: 'We specialize in connecting clients with premium properties.',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs-InA73YejhhsMLAKdKAUCrP5Xkp1oWZhow&s',
    }


    if (
      window.confirm('Êtes-vous sûr de vouloir créer un nouveau partenaire ?')
    ) {
      try {
        await createPartner(newPartner)
        refetch()
        toast.success('Partenaire créé avec succès')
      } catch (error) {
        toast.error('Échec de la création du partenaire')
      }
    }
  }

  const handleDeletePartner = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) {
      try {
        await deletePartner(id)
        refetch()
        toast.success('Partenaire supprimé avec succès')
      } catch (error) {
        toast.error('Échec de la suppression du partenaire')
      }
    }
  }

  if (isLoading || loadingCreate || loadingDelete) {
    return <Loading />
  }

  if (error) {
    return <Error message='Erreur lors du chargement des partenaires.' />
  }

  return (
    <div className='container'>
      <div className='header'>
        <h1>Liste des Partenaires</h1>
        <button
          onClick={handleCreatePartner}
          disabled={loadingCreate}
          className='btn btn-primary'
        >
          {loadingCreate ? 'Création en cours...' : 'Créer un partenaire'}
        </button>
      </div>

      {loadingDelete && <Loading message="Suppression de l\'agent..." />}

      {partners?.length === 0 ? (
        <p>Aucun partenaire trouvé</p>
      ) : (
        <div className='partner-list property-list '>
          {partners.map((partner) => (
            <div key={partner._id} className='partner-card'>
              <img
                src={partner.image || 'https://via.placeholder.com/150'}
                alt={partner.name}
                className='partner-image'
              />
              <div className='partner-info'>
                <h2>{partner.name}</h2>
                <p>{partner.profession}</p>
                <p>{partner.address}</p>
                <p>{partner.contactEmail}</p>
                <p>{partner.contactNumber}</p>

                {partner.socialMedia && (
                  <div className='social-media'>
                    {partner.socialMedia.facebook && (
                      <a
                        href={partner.socialMedia.facebook}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Facebook
                      </a>
                    )}
                    {partner.socialMedia.instagram && (
                      <a
                        href={partner.socialMedia.instagram}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Instagram
                      </a>
                    )}
                  </div>
                )}

                <p>{partner.website}</p>
                <p>{partner.about}</p>
              </div>

              <div className='partner-actions'>
                <Link
                  to={`/admin/partnerList/${partner._id}/edit`}
                  className='btn btn-edit'
                >
                  <FaEdit /> Modifier
                </Link>
                <button
                  onClick={() => handleDeletePartner(partner._id)}
                  className='btn btn-delete'
                  disabled={loadingDelete}
                >
                  <FaTrash /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PartenairList
