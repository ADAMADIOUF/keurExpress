import React from 'react'

import PropertieHome from '../pages/PropertieHome'

const Property = () => {

  return (
    <div className='property'>
      <div className='section-center'>
        <div className='home-about-container'>
          <article className='home-about-details'>
            <div className='hero-content hero-home-about'>
              <div className='dote'></div>
              <span className='hero-text'>Propriété</span>{' '}
              {/* Translated text for 'Property' */}
              <h3>Trouvez votre maison idéale avec Keur Express</h3>{' '}
              {/* Translated text for 'Find Your Perfect Home With Keur Express' */}
            </div>
          </article>
          <article className='home-about-content'>
            <p>
              Où vous pouvez découvrir une large gamme de maisons disponibles à
              la vente et à la location. Parcourez nos annonces soigneusement
              sélectionnées ci-dessous pour trouver la propriété idéale.
            </p>
          </article>
        </div>
        <hr />
        <div className='properies-home'>
          <PropertieHome />
        </div>
      </div>
    </div>
  )
}

export default Property
