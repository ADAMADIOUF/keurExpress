import React from 'react'
import { Link } from 'react-router-dom'
import a from '../assets/f1.png'
import b from '../assets/f2.png'
import c from '../assets/f3.png'
const BannerReusable = ({ image, title, description, link, linkText }) => {
  return (
    <div className='banner-reusable'>
      <div className='section-center-resuable'>
        <div className='banner-image-container'>
          <img src={image} alt={title} className='banner-image' />
        </div>
        <div className='banner-content'>
          <h2>{title}</h2>
          <p>{description}</p>
          <Link to={link} className='banner-link'>
            {linkText}
          </Link>
        </div>
        <div className='footer-image-absolute'>
          <div className='first-banner-img-resuable'>
            <img src={a} alt='' />
          </div>
          <div className='second-banner-img-resuable'>
            <img src={b} alt='' />
          </div>

          <div className='third-banner-img-resuable'>
            <img src={c} alt='' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerReusable
