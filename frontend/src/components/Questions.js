import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'


const Questions = ({ setIsImageMoving }) => {
  const [isOpen, setIsOpen] = useState(null) // To manage which question is open
 

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
          <h2>{'Notre mission'}</h2> {/* Use translation for mission title */}
          {isOpen === 1 ? <FaAngleUp /> : <FaAngleDown />} {/* Toggle icon */}
        </div>
        {isOpen === 1 && (
          <p className='question-description'>
            {`Notre mission est d'offrir un service exceptionnel et des innovations qui
    améliorent la vie de nos clients.`}{' '}
            {/* Use translation for mission description */}
          </p>
        )}
      </div>

      <div className='question-item'>
        <div className='question-title' onClick={() => toggleQuestion(2)}>
          <h2>{'Transparence et intégrité'}</h2>{' '}
          {/* Use translation for transparency title */}
          {isOpen === 2 ? <FaAngleUp /> : <FaAngleDown />} {/* Toggle icon */}
        </div>
        {isOpen === 2 && (
          <p className='question-description'>
            Nous maintenons la transparence et l'intégrité en garantissant
            l'honnêteté et l'ouverture dans tout ce que nous faisons.
          </p>
        )}
      </div>

      <div className='question-item'>
        <div className='question-title' onClick={() => toggleQuestion(3)}>
          <h2>{'Approche centrée sur le client'}</h2>{' '}
          {/* Use translation for customer-centric title */}
          {isOpen === 3 ? <FaAngleUp /> : <FaAngleDown />} {/* Toggle icon */}
        </div>
        {isOpen === 3 && (
          <p className='question-description'>
            Nous nous concentrons sur la compréhension et la satisfaction des
            besoins de nos clients pour fournir des solutions de haute qualité.
          </p>
        )}
      </div>

      <div className='question-item'>
        <div className='question-title' onClick={() => toggleQuestion(4)}>
          <h2>{'Technologie innovante'}</h2>{' '}
          {/* Use translation for innovation title */}
          {isOpen === 4 ? <FaAngleUp /> : <FaAngleDown />} {/* Toggle icon */}
        </div>
        {isOpen === 4 && (
          <p className='question-description'>
            Nous adoptons les technologies de pointe pour créer des produits et
            services innovants qui favorisent le progrès.
          </p>
        )}
      </div>
    </div>
  )
}

export default Questions
