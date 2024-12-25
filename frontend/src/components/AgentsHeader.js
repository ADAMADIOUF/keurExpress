import React from 'react'
import Agents from '../pages/Agents'


const AgentsHeader = () => {
  return (
    <div className='agents'>
      <div className='section-center'>
        <div className='home-about-container'>
          <article className='home-about-details'>
            <div className='hero-content hero-home-about'>
              <div className='dote'></div>
              <span className='hero-text'>Agent</span>
              <h3>Your Trusted Real Estate Advisors</h3>
            </div>
          </article>
          <article className='home-about-content'>
            <p>
              Get to know the dedicated professionals behind Keur Express who
              are committed to helping you navigate the real estate market with
              confidence
            </p>
          </article>
        </div>
        <Agents/>
     
      </div>
    </div>
  )
}

export default AgentsHeader
