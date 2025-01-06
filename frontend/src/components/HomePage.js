import React from 'react'
import Hero from './Hero'
import Companies from './Companies'
import HomeAbout from './HomeAbout'
import Property from './Property'
import Testinonial from './Testimonial'
import LastProperties from '../pages/LastProperties'
import AgentsHeader from './AgentsHeader'
import Blog from '../pages/Blog'
import BannerReusable from './BannerResubale'
import { useParams } from 'react-router-dom'

const HomePage = () => {
   
   const {  keyword } = useParams()
  return (
    <div>
      {!keyword && <Hero />}
      {!keyword && <Companies />}
      {!keyword && <HomeAbout />}
      <Property />
      {!keyword && <Testinonial />}
      <LastProperties />
      {!keyword && <AgentsHeader />}
      {!keyword && <Blog />}
      {!keyword && (
        <BannerReusable
          image='https://cdn.prod.website-files.com/668f4d3cb04ed39f764a5ecc/66a1f24bfd8a60fbf773f029_Footer%20Top%20CTA%20Image.png'
          title={`Trouvez Votre Maison de Rêve ? Contactez-Nous Aujourd'hui !`}
          description={`Faites le premier pas vers l'accession à la propriété et contactez notre équipe d'experts chez Keur Express.

En Savoir Plus Sur Nous
Apprenez-en davantage sur qui nous sommes et comment nous pouvons vous aider à trouver la maison idéale.`}
          target='/about'
          label={'En Savoir Plus Sur Nous'}
        />
      )}
    </div>
  )
}

export default HomePage
