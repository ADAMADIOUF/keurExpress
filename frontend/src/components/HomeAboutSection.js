import React from 'react'

const HomeAboutSection = ({ heroText, heading, description }) => {
  return (
    <div className='home-about-container'>
      <article className='home-about-details'>
        <div className='hero-content hero-home-about'>
          <div className='dote'></div>
          <span className='hero-text'>{heroText}</span>
          <h3>{heading}</h3>
        </div>
      </article>
      <article className='home-about-content'>
        <p>{description}</p>
      </article>
    </div>
  )
}

export default HomeAboutSection
