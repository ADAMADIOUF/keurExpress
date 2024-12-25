import React from 'react'
import NavigateButton from './NavigateButton' 

const BannerReusable = ({ image, title, description, target, label }) => {
  return (
    <div className='banner-reusable'>
      <div className='section-center-reusable'>
        <div className='banner-image-container'>
          <img src={image} alt={title} className='banner-image' />
        </div>
        <div className='banner-content'>
          <h2>{title}</h2>
          <p>{description}</p>
          {/* Use the NavigateButton component */}
          <NavigateButton target={target} label={label} />
        </div>
      </div>
    </div>
  )
}

export default BannerReusable
