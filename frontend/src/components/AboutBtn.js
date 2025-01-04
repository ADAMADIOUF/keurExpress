import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next' // Import i18next translation hook

const AboutBtn = () => {
  const navigate = useNavigate()
  const { t } = useTranslation() // Use the translation hook

  const handleClick = () => {
    // Scroll to the top of the page
    window.scrollTo(0, 0)

    // Navigate to the About page
    navigate('/about')
  }

  return (
    <button onClick={handleClick} className='btn'>
      {t('about Us')} {/* Use translation for "About Us" */}
    </button>
  )
}

export default AboutBtn
