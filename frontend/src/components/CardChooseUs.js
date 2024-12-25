import React from 'react'
import { FaUserTie, FaHandshake, FaHeadset } from 'react-icons/fa' 

const CardChooseUs = () => {
  return (
    <div className='card-choose'>
      <div className='card-choose-container'>
        <article>
          <span>01</span>
          <div className='card-icons'>
            <FaUserTie />
          </div>
          <h3>Expertise</h3>
          <p>Our team of seasoned professionals brings years of experience.</p>
        </article>
        <article>
          <span>02</span>
          <div className='card-icons'>
            <FaHandshake />
          </div>
          <h3>Personalized Service</h3>
          <p>
            We believe in treating every client as unique individuals with
            specific needs.
          </p>
        </article>
        <article>
          <span>03</span>
          <div className='card-icons'>
            <FaHeadset />{' '}
          </div>
          <h3>Comprehensive Support</h3>
          <p>
            You can count on us whether you're buying, selling, or investing
          </p>
        </article>
      </div>
    </div>
  )
}

export default CardChooseUs
