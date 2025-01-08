import React from 'react'
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
import { useParams } from 'react-router-dom'

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

  console.log('Données des propriétés:', properties)
  console.log('Données des utilisateurs:', usersData)

  // Gérer les états de chargement et d'erreur
  if (propertiesLoading || usersLoading) {
    return <div>Chargement...</div>
  }

  if (propertiesError || usersError) {
    console.error(
      'Erreur de chargement des données:',
      propertiesError || usersError
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
    : 0 // Accéder à properties.data

  // Données du graphique pour les utilisateurs et les propriétés
  const chartData = {
    labels: ['Utilisateurs', 'Propriétés'],
    datasets: [
      {
        label: 'Nombre total',
        data: [totalUsers, totalProperties],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
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
        text: 'Utilisateurs vs Propriétés',
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
      </div>
    </div>
  )
}

export default DashBoard
