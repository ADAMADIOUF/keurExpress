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
    </section>
  )
}

export default HeroReusable
