import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetPropertieByIdQuery } from '../slices/propertieSlice'
import { useAddToWishlistMutation, useCheckWishlistQuery } from '../slices/wishlistApiSlice'
import {
  FaPhone,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaHome,
  FaBed,
  FaBath,
  FaCar,
  FaHeart,
  FaGitSquare,
  FaCouch,
} from 'react-icons/fa'

import Loading from '../components/Loading'
import Error from '../components/Error'
import Map from '../components/Map'
import HeroReusable from '../components/HeroResuable'
import MessagesList from '../screen/MessageList'
import { toast } from 'react-toastify'

const SinglePropertie = () => {
  const { id: propertieId } = useParams()
  const [mainImage, setMainImage] = useState('')
  const [addToWishlist, { isLoading: loadingAddToWishlist }] =
    useAddToWishlistMutation()
    const { data: checkWishlistData, isLoading: isLoadingCheck } =
      useCheckWishlistQuery(propertieId)
  const {
    data: propertie,
    error,
    isLoading,
    refetch,
  } = useGetPropertieByIdQuery(propertieId)

  const phoneNumber = propertie?.data?.userProfile?.phoneNumber
  const whatsappLink = `https://wa.me/${phoneNumber?.replace(/\D/g, '')}`

  const handleThumbnailImageClick = (image) => {
    setMainImage(image)
  }
   const isInWishlist = checkWishlistData?.isInWishlist
const addToWishlistHandler = async () => {
  if (isInWishlist) {
    toast.info('Cette propriété est déjà dans votre liste de souhaits !')
    return
  }

  try {
    await addToWishlist(propertieId).unwrap()
    toast.success('Propriété ajoutée à la liste de souhaits !')
  } catch (error) {
    toast.error(`Échec de l'ajout à la liste de souhaits. Veuillez vous connecter.`)
  }
}
  if (!propertieId) {
    return <Error message='Property ID is missing!' />
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <Error
        message='Failed to load property details.'
        action={
          <button
            onClick={refetch}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        }
      />
    )
  }

  if (!propertie) {
    return <Error message='Property details not found.' />
  }

  return (
    <div className='singlePropertie'>
      <HeroReusable
        title={'Détails de la propriété'}
        titleTwo={propertie.data.title}
        description={propertie.data.description}
      />
      <div className='singlePropertie-details section-center'>
        <article>
          <div className='singlepropertie-big-img'>
            <img
              src={mainImage || propertie?.data?.images[0]}
              alt={propertie?.data?.title}
            />
          </div>
          <button
            className='btn btn-danger'
            onClick={addToWishlistHandler}
            disabled={isLoading || isInWishlist} // Using 'isLoading' instead of 'isAdding'
          >
            <FaHeart color={isInWishlist ? 'red' : 'gray'} />{' '}
            {isInWishlist
              ? 'Déjà dans la liste de souhaits'
              : 'Ajouter à la liste de souhaits'}
          </button>
          <div className='fisrt-details no-wrap'>
            <article>
              <p>
                <FaHome style={{ marginRight: '5px' }} /> Par mois
              </p>
              <p>{propertie?.data?.price} </p>
            </article>

            <article>
              <p>
                <FaMapMarkerAlt style={{ marginRight: '5px' }} /> Emplacement
              </p>
              <p>
                {propertie?.data?.location.city},{' '}
                {propertie?.data?.location.address}
              </p>
            </article>

            <article>
              <p>
                <FaHome style={{ marginRight: '5px' }} /> Type
              </p>
              <p>{propertie?.data?.propertyType}</p>
            </article>

            <article>
              <p>
                <FaGitSquare style={{ marginRight: '5px' }} /> Superficie
              </p>
              <p>{propertie?.data?.size} m²</p>
            </article>

            {propertie?.data?.livingrooms && (
              <article>
                <p>
                  <FaCouch style={{ marginRight: '5px' }} /> salons
                </p>
                <p>{propertie?.data?.livingrooms}</p>
              </article>
            )}

            {propertie?.data?.bathrooms && (
              <article>
                <p>
                  <FaBath style={{ marginRight: '5px' }} /> Salles de bains
                </p>
                <p>{propertie?.data?.bathrooms}</p>
              </article>
            )}

            {propertie?.data?.bedrooms && (
              <article>
                <p>
                  <FaBed style={{ marginRight: '5px' }} /> Chambres
                </p>
                <p>{propertie?.data?.bedrooms}</p>
              </article>
            )}

            <article>
              <p>
                <FaCar style={{ marginRight: '5px' }} /> Garage
              </p>
              <p>{propertie?.data?.garage ? 'Oui' : 'Non'}</p>
            </article>

            <article>
              <p>Statut</p>
              <p>{propertie?.data?.status}</p>
            </article>
          </div>

          <hr />
          <h1>{propertie?.data?.title}</h1>
          <p>{propertie?.data?.description}</p>

          {/* Informations supplémentaires */}
          <article>
            <p>Publié le</p>
            <p>{new Date(propertie?.data?.datePosted).toLocaleDateString()}</p>
          </article>
          <article>
            <p>Dernière mise à jour</p>
            <p>{new Date(propertie?.data?.updatedAt).toLocaleDateString()}</p>
          </article>
        </article>
        <article className='person-property'>
          <img
            src={
              propertie?.data?.userProfile?.profileImage &&
              propertie?.data?.userProfile?.profileImage !== ''
                ? propertie?.data?.userProfile?.profileImage
                : 'https://static.vecteezy.com/system/resources/thumbnails/002/172/762/small_2x/house-front-view-illustration-free-vector.jpg'
            }
            alt="Photo de profil de l'utilisateur"
            style={{ width: '300px', height: '300px', borderRadius: '50%' }}
          />

          <h3>
            {propertie?.data?.userProfile?.name}{' '}
            {propertie?.data?.userProfile?.lastName}
          </h3>
          <p>Email : {propertie?.data?.userProfile?.email}</p>
          <p>Informations de contact :</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Appeler par téléphone */}
            <a
              href={`tel:${phoneNumber}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <FaPhone style={{ marginRight: '5px' }} />
              Appeler
            </a>

            {/* Ouvrir WhatsApp */}
            <a
              href={whatsappLink}
              target='_blank'
              rel='noopener noreferrer'
              style={{ textDecoration: 'none', color: 'green' }}
            >
              <FaWhatsapp style={{ marginRight: '5px' }} />
              WhatsApp
            </a>
          </div>
          <MessagesList propertyId={propertieId} />
          {propertie?.data?.images && propertie.data.images.length > 0 && (
            <div className='property-images'>
              <h3>Images :</h3>
              {propertie.data.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Propriété ${index + 1}`}
                  className={`thumbnail ${
                    mainImage === image ? 'thumbnail-active' : ''
                  }`}
                  onClick={() => handleThumbnailImageClick(image)}
                  style={{ cursor: 'pointer', width: '100px', height: '100px' }}
                />
              ))}
            </div>
          )}
          <div className='map-container'>
            <Map
              city={propertie?.data?.location?.city}
              address={propertie?.data?.location?.address}
              lat={propertie?.data?.location?.lat}
              lng={propertie?.data?.location?.lng}
            />
          </div>
        </article>
      </div>
    </div>
  )
}

export default SinglePropertie
