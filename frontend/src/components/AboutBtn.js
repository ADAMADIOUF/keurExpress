import React from 'react'
import { useNavigate } from 'react-router-dom'

const AboutBtn = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    // Scroll to the top of the page
    window.scrollTo(0, 0)

    // Navigate to the About page
    navigate('/about')
  }

  return (
    <button onClick={handleClick} className='btn'>
      About Us
    </button>
  )
}

export default AboutBtn
