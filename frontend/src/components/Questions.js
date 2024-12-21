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
          <h2>Our Mission</h2>
          {isOpen === 1 ? <FaAngleUp /> : <FaAngleDown />} {/* Toggle icon */}
        </div>
        {isOpen === 1 && (
          <p className='question-description'>
            Our mission is to deliver exceptional service and innovation that
            improves the lives of our customers.
          </p>
        )}
      </div>

      <div className='question-item'>
        <div className='question-title' onClick={() => toggleQuestion(2)}>
          <h2>Transparency and Integrity</h2>
          {isOpen === 2 ? <FaAngleUp /> : <FaAngleDown />} {/* Toggle icon */}
        </div>
        {isOpen === 2 && (
          <p className='question-description'>
            We uphold transparency and integrity by ensuring honesty and
            openness in everything we do.
          </p>
        )}
      </div>

      <div className='question-item'>
        <div className='question-title' onClick={() => toggleQuestion(3)}>
          <h2>Customer-Centric Approach</h2>
          {isOpen === 3 ? <FaAngleUp /> : <FaAngleDown />} {/* Toggle icon */}
        </div>
        {isOpen === 3 && (
          <p className='question-description'>
            We focus on understanding and meeting the needs of our customers to
            provide top-quality solutions.
          </p>
        )}
      </div>

      <div className='question-item'>
        <div className='question-title' onClick={() => toggleQuestion(4)}>
          <h2>Innovation Technology</h2>
          {isOpen === 4 ? <FaAngleUp /> : <FaAngleDown />} {/* Toggle icon */}
        </div>
        {isOpen === 4 && (
          <p className='question-description'>
            We embrace cutting-edge technology to create innovative products and
            services that drive progress.
          </p>
        )}
      </div>
    </div>
  )
}

export default Questions
