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

// Register the chart components
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

  console.log('Properties data:', properties)
  console.log('Users data:', usersData)

  // Handle loading and error states
  if (propertiesLoading || usersLoading) {
    return <div>Loading...</div>
  }

  if (propertiesError || usersError) {
    console.error('Error loading data:', propertiesError || usersError)
    return (
      <div>
        <p>Error loading data</p>
        <p>Check console for more details.</p>
      </div>
    )
  }

  // Safely calculate total counts
  const totalUsers = Array.isArray(usersData) ? usersData.length : 0
  const totalProperties = Array.isArray(properties?.data)
    ? properties.data.length
    : 0 // Access properties.data

  // Chart data for users and properties
  const chartData = {
    labels: ['Users', 'Properties'],
    datasets: [
      {
        label: 'Total Count',
        data: [totalUsers, totalProperties],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  }

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Users vs Properties',
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
      <h2>Dashboard</h2>
      <div className='chart-container'>
        <Bar data={chartData} options={options} />
      </div>
      <div className='summary-container'>
        <div className='summary-card'>
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div className='summary-card'>
          <h3>Total Properties</h3>
          <p>{totalProperties}</p>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
