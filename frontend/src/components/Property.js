import React from 'react'
import PropertieHome from '../pages/PropertieHome'

const Property = () => {
  return (
    <div className='property'>
      <div className='section-center'>
        <div className='home-about-container'>
          <article className='home-about-details'>
            <div className='hero-content hero-home-about'>
              <div className='dote'></div>
              <span className='hero-text'>Property</span>
              <h3>Find Your Perfect Home With Keur Express</h3>
            </div>
          </article>
          <article className='home-about-content'>
            <p>
              Where you can discover a diverse range of homes available for sale
              and rent. Browse through our curated listings below to find your
              ideal property
            </p>
          </article>
        </div>
        <hr />
        <div className="properies-home">
          <PropertieHome/>
        </div>
      </div>
    </div>
  )
}

export default Property
