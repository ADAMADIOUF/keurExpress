import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useGetProperiesQuery } from '../slices/propertieSlice'
import { useGetUsersQuery } from '../slices/userApiSlice'
import { useGetPostsQuery } from '../slices/blogApiSlice'
import { useGetPartnersQuery } from '../slices/partnerSlice'
import { useGetAgentsQuery } from '../slices/agentApiSlice'
import { Link, useParams } from 'react-router-dom'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

// Enregistrer les composants du graphique
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

const DashBoard = () => {
  const {
    keyword = '',
    location = '',
    address = '',
    propertyType = '',
    minPrice = '',
    maxPrice = '',
  } = useParams()

  const {
    data: properties,
    error: propertiesError,
    isLoading: propertiesLoading,
  } = useGetProperiesQuery({
    keyword,
    location,
    address,
    propertyType,
    minPrice,
    maxPrice,
  })

  const {
    data: usersData,
    error: usersError,
    isLoading: usersLoading,
  } = useGetUsersQuery()

  // Fetch posts, partners, and agents data
  const {
    data: posts,
    error: postsError,
    isLoading: postsLoading,
  } = useGetPostsQuery()
  const {
    data: partners,
    error: partnersError,
    isLoading: partnersLoading,
    refetch,
  } = useGetPartnersQuery()
  const {
    data: agents,
    error: agentsError,
    isLoading: agentsLoading,
  } = useGetAgentsQuery()

  console.log('Données des propriétés:', properties)
  console.log('Données des utilisateurs:', usersData)
  console.log('Données des articles:', posts)
  console.log('Données des partenaires:', partners)
  console.log('Données des agents:', agents)

  // Gérer les états de chargement et d'erreur
  if (
    propertiesLoading ||
    usersLoading ||
    postsLoading ||
    partnersLoading ||
    agentsLoading
  ) {
    return <div>Chargement...</div>
  }

  if (
    propertiesError ||
    usersError ||
    postsError ||
    partnersError ||
    agentsError
  ) {
    console.error(
      'Erreur de chargement des données:',
      propertiesError ||
        usersError ||
        postsError ||
        partnersError ||
        agentsError
    )
    return (
      <div>
        <p>Erreur de chargement des données</p>
        <p>Vérifiez la console pour plus de détails.</p>
      </div>
    )
  }

  // Calculer en toute sécurité les totaux
  const totalUsers = Array.isArray(usersData) ? usersData.length : 0
  const totalProperties = Array.isArray(properties?.data)
    ? properties.data.length
    : 0
  const totalPosts = Array.isArray(posts) ? posts.length : 0
  const totalPartners = Array.isArray(partners) ? partners.length : 0
  const totalAgents = Array.isArray(agents) ? agents.length : 0

  // Données du graphique pour les utilisateurs et les propriétés
  const chartData = {
    labels: ['Utilisateurs', 'Propriétés', 'Articles', 'Partenaires', 'Agents'],
    datasets: [
      {
        label: 'Nombre total',
        data: [
          totalUsers,
          totalProperties,
          totalPosts,
          totalPartners,
          totalAgents,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  // Options du graphique
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Utilisateurs, Propriétés, Articles, Partenaires et Agents',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className='dashboard-container'>
      <h2>Tableau de bord</h2>
      <div className='chart-container'>
        <Bar data={chartData} options={options} />
      </div>
      <div className='summary-container'>
        <div className='summary-card'>
          <h3>Utilisateurs totaux</h3>
          <p>{totalUsers}</p>
        </div>
        <div className='summary-card'>
          <h3>Propriétés totales</h3>
          <p>{totalProperties}</p>
        </div>
        <div className='summary-card'>
          <h3>Articles totaux</h3>
          <p>{totalPosts}</p>
        </div>
        <div className='summary-card'>
          <h3>Partenaires totaux</h3>
          <p>{totalPartners}</p>
        </div>
        <div className='summary-card'>
          <h3>Agents totaux</h3>
          <p>{totalAgents}</p>
        </div>
      </div>

      {/* Displaying Partners */}
      <div className='partners-container'>
        {partners?.map((partner) => (
          <div key={partner._id} className='partner-card'>
            <h3>{partner.name}</h3>
            <p className='profession'>{partner.profession}</p>
            <p className='description'>{partner.description}</p>
            <p className='address'>Adresse: {partner.address}</p>
            <p className='contact-info'>Téléphone: {partner.contactNumber}</p>
            <p className='contact-info'>
              Email:{' '}
              <a href={`mailto:${partner.contactEmail}`}>
                {partner.contactEmail}
              </a>
            </p>
            <p className='website'>
              Website:{' '}
              <a
                href={partner.website}
                target='_blank'
                rel='noopener noreferrer'
              >
                {partner.website}
              </a>
            </p>
          </div>
        ))}
      </div>

      {/* Displaying Agents */}
      <div className='agents-container'>
        {agents?.map((agent) => (
          <div key={agent._id} className='agent-card'>
            <h2 className='agent-name'>
              <Link to={`/agent/${agent._id}`}>{agent.name}</Link>
            </h2>
            <p className='agent-description'>{agent.description}</p>
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
                    {agent.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashBoard
