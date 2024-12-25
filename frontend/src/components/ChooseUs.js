import React from 'react'
import HomeAboutSection from "./HomeAboutSection"
import CardChooseUs from './CardChooseUs'
import ProgressBar from './ProgressBar'
const ChooseUs = () => {
  return (
    <div className='choose-us'>
      <div className='section-center'>
        <HomeAboutSection
          heroText='
Why Choose Us'
          heading='Why Choose Keur Express for Real Estate Partner'
          description="At Keur Express, we understand that choosing a real estate partner is a significant decision. Here's why we stand out from the rest."
        />
        <hr />
        <CardChooseUs/>
        <ProgressBar/>
      </div>
    </div>
  )
}

export default ChooseUs
