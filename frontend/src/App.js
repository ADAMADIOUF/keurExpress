import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ScrollToTop from './components/ScrollTop'
const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <ToastContainer />
      <Footer />
    </div>
  )
}

export default App
