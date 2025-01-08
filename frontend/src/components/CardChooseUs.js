import React from 'react'
import { FaUserTie, FaHandshake, FaHeadset } from 'react-icons/fa'

const CardChooseUs = () => {
  return (
    <div className='card-choose'>
      <div className='card-choose-container'>
        <article>
          <span>01</span>
          <div className='card-icons'>
            <FaUserTie />
          </div>
          <h3>Expertise</h3>
          <p>
            Notre équipe de professionnels expérimentés apporte des années
            d'expérience.
          </p>
        </article>
        <article>
          <span>02</span>
          <div className='card-icons'>
            <FaHandshake />
          </div>
          <h3>Service Personnalisé</h3>
          <p>
            Nous croyons en la nécessité de traiter chaque client comme une
            personne unique avec des besoins spécifiques.
          </p>
        </article>
        <article>
          <span>03</span>
          <div className='card-icons'>
            <FaHeadset />
          </div>
          <h3>Soutien Complet</h3>
          <p>
            Vous pouvez compter sur nous, que ce soit pour acheter, vendre ou
            investir.
          </p>
        </article>
      </div>
    </div>
  )
}

export default CardChooseUs
