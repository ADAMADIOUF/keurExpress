import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)

  // Check if userInfo exists and if the role is 'isAdmin'
  if (!userInfo || userInfo.role !== 'isAdmin') {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default AdminRoute
