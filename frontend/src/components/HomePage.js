import React from 'react'
import Hero from './Hero'
import Companies from './Companies'
import HomeAbout from './HomeAbout'
import Property from './Property'
import Testinonial from './Testinonial'
import LastProperties from '../pages/LastProperties'
import Agents from './AgentsHeader'
import AgentsHeader from './AgentsHeader'
import Blog from '../pages/Blog'
import BannerReusable from './BannerResubale'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Companies />
      <HomeAbout />
      <Property />
      <Testinonial />
      <LastProperties />
      <AgentsHeader />
      <Blog />
      <BannerReusable
        image='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a1f24bfd8a60fbf773f029_Footer%20Top%20CTA%20Image.png'
        title='Find Your Dream Home? Contact Us Today!'
        description='Take the first step towards homeownership and reach out to our expert team at Keur Express.'
        link='/explore'
        linkText='Explore Now'
      />
    </div>
  )
}

export default HomePage
