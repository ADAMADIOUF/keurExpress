import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { useTranslation } from 'react-i18next' // Import i18next translation hook

const Questions = ({ setIsImageMoving }) => {
  const [isOpen, setIsOpen] = useState(null) // To manage which question is open
  const { t } = useTranslation() // Use the useTranslation hook to get translations

  // Toggle function to open or close a specific question
  const toggleQuestion = (index) => {
    setIsOpen(isOpen === index ? null : index) // Close if already open, open if not
    // Trigger image movement when a question is toggled
    setIsImageMoving(isOpen === index ? false : true)
  }

  return (
    <div className='questions'>
      <div className='question-item'>
        <div className='question-title' onClick={() => toggleQuestion(1)}>
          <h2>{t('questions.mission')}</h2>{' '}
          {/* Use translation for mission title */}
          {isOpen === 1 ? <FaAngleUp /> : <FaAngleDown />} {/* Toggle icon */}
        </div>
        {isOpen === 1 && (
          <p className='question-description'>
            {t('questions.missionDescription')}{' '}
            {/* Use translation for mission description */}
          </p>
        )}
      </div>

      <div className='question-item'>
        <div className='question-title' onClick={() => toggleQuestion(2)}>
          <h2>{t('questions.transparency')}</h2>{' '}
          {/* Use translation for transparency title */}
          {isOpen === 2 ? <FaAngleUp /> : <FaAngleDown />} {/* Toggle icon */}
        </div>
        {isOpen === 2 && (
          <p className='question-description'>
            {t('questions.transparencyDescription')}{' '}
            {/* Use translation for transparency description */}
          </p>
        )}
      </div>

      <div className='question-item'>
        <div className='question-title' onClick={() => toggleQuestion(3)}>
          <h2>{t('questions.customerCentric')}</h2>{' '}
          {/* Use translation for customer-centric title */}
          {isOpen === 3 ? <FaAngleUp /> : <FaAngleDown />} {/* Toggle icon */}
        </div>
        {isOpen === 3 && (
          <p className='question-description'>
            {t('questions.customerCentricDescription')}{' '}
            {/* Use translation for customer-centric description */}
          </p>
        )}
      </div>

      <div className='question-item'>
        <div className='question-title' onClick={() => toggleQuestion(4)}>
          <h2>{t('questions.innovation')}</h2>{' '}
          {/* Use translation for innovation title */}
          {isOpen === 4 ? <FaAngleUp /> : <FaAngleDown />} {/* Toggle icon */}
        </div>
        {isOpen === 4 && (
          <p className='question-description'>
            {t('questions.innovationDescription')}{' '}
            {/* Use translation for innovation description */}
          </p>
        )}
      </div>
    </div>
  )
}

export default Questions
