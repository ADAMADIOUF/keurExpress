import React, { useState } from 'react'
import Questions from './Questions'
import a from '../assets/homeabout.png'
import { FaBath, FaBed } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import AboutBtn from './AboutBtn'


const HomeAbout = () => {
  const [isImageMoving, setIsImageMoving] = useState(false) // Track image movement

  return (
    <div className='homeAbout section-center'>
      <div className='home-about-container'>
        <article className='home-about-details'>
          <div className='hero-content hero-home-about'>
            <div className='dote'></div>
            <span className='hero-text'>About Us</span>
            <h3>Elevate Your Real Estate Experience With Keur Express</h3>
          </div>
        </article>
        <article className='home-about-content'>
          <p>
            At Keur Express, we are committed to simplifying your real estate
            journey and helping you find the perfect home. With our dedicated
            team of experts.
          </p>
        </article>
      </div>
      <hr />
      <div className='container-questions'>
        <article>
          <Questions setIsImageMoving={setIsImageMoving} />{' '}
      <AboutBtn/>
        </article>
        <article className={`home-about-img ${isImageMoving ? 'move' : ''}`}>
          {' '}
          {/* Apply class conditionally */}
          <img src={a} alt='' />
          <div className='details-home-about-img'>
            <div className='home-about-content-img'>
              <article>
                <h3>$567.00/Month</h3>
                <p>New York City</p>
              </article>
              <article>
                <span>
                  <FaBed /> 3 bed
                </span>
                <span>
                  <FaBath /> 2bath
                </span>
              </article>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default HomeAbout
