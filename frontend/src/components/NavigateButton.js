import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const NavigateButton = ({ target, label }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = () => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling
    })

    // If we're not already on the target page, navigate to the target
    if (location.pathname !== target) {
      setTimeout(() => {
        navigate(target)
      }, 300) // Delay the navigation slightly to ensure scrolling happens first
    }
  }

  return (
    <div>
      <div className='navigate-btn'>
        <button className='btn' onClick={handleClick}>
          {label}
        </button>
      </div>
    </div>
  )
}

export default NavigateButton
