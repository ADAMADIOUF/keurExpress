import React, { lazy, Suspense } from 'react' // Import lazy and Suspense from React

import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Lazy load components
const Navbar = lazy(() => import('./components/Navbar'))
const Footer = lazy(() => import('./components/Footer'))
const ScrollToTop = lazy(() => import('./components/ScrollTop'))

const App = () => {
  return (
    <div>
      {/* Suspense with fallback loading indicator */}
      <Suspense fallback={<div>Loading...</div>}>
        <ScrollToTop />
        <Navbar />
        <Outlet />
        <ToastContainer />
        <Footer />
      </Suspense>
    </div>
  )
}

export default App
