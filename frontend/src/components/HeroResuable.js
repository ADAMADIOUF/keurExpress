import React from 'react'

const HeroReusable = ({ title, titleTwo, description, subtitle }) => {
  return (
    <section className='heroResuable'>
      <div className='hero-content'>
        <div className='dote'></div>
        <span className='hero-text'>{title}</span>
      </div>
      <div className='subtitle'>{subtitle}</div>
      <div className='heroResuable-content'>
        <h1 className='heroResuable-title'>{titleTwo}</h1>
        <p className='heroResuable-description'>{description}</p>
      </div>
      <div className='resuable-img'>
        <div className='img-resuable-1'>
          <img
            src='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/669395bc083f1fe4f7c61c51_Loop%20Line.svg'
            alt=''
          />
        </div>
        <div className='img-resuable-2'>
          <img
            src='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/669395be0581e8c6129db93e_Star%20Icon.svg'
            alt=''
          />
        </div>
      </div>
    </section>
  )
}

export default HeroReusable
