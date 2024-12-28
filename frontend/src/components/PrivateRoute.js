

import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)

  // You could add a loading state or check that userInfo is correctly set before rendering the route
  if (!userInfo) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default PrivateRoute