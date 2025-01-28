import React from 'react'
import { Link } from 'react-router-dom'

import a from '../assets/f1.png'
import b from '../assets/f2.png'
import c from '../assets/f3.png'
import logo from '../assets/hero.png'
const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='footer'>
      <div className='footer-container section-center'>
        <div className='footer-about'>
          <img src={logo} alt='Logo NestBes' className='footer-logo' />
          <p>
            {
              'Embarquez dans un voyage pour trouver votre espace de vie idéal avec NestBes. Explorez une sélection de propriétés soigneusement choisies.'
            }
          </p>
        </div>

        {/* Inscription à la Newsletter */}
        <div className='footer-newsletter'>
          <h4>{'Entrez Votre Email'}</h4>
          <form>
            <input
              type='email'
              placeholder={'Entrez Votre Email'}
              className='footer-input'
            />
            <button type='submit' className='btn'>
              {"S'abonner"}
            </button>
          </form>
        </div>

        {/* Liens Rapides */}
        <div className='footer-links'>
          <h4>{'Liens Rapides'}</h4>
          <ul>
            <li>
              <Link to='/'>{'Accueil'}</Link>
            </li>
            <li>
              <Link to='/about'>{'À propos'}</Link>
            </li>
            <li>
              <Link to='/property'>{'Propriétés'}</Link>
            </li>
            <li>
              <Link to='/agent'>{'Agents'}</Link>
            </li>
            <li>
              <Link to='/all-blogs'>{'Blog'}</Link>
            </li>
            <li>
              <Link to='/contact'>{'Contact'}</Link>
            </li>
          </ul>
        </div>

        {/* Pages Utilitaires */}
        <div className='footer-utility'>
          <h4>{'Pages Utilitaires'}</h4>
          <ul>
            <li>
              <Link to='/password-protected'>{'Protégé par mot de passe'}</Link>
            </li>
            <li>
              <Link to='/404'>{'Page Non Trouvée'}</Link>
            </li>
            <li>
              <Link to='/style-guide'>{'Guide de style'}</Link>
            </li>
            <li>
              <Link to='/license'>{'Licence'}</Link>
            </li>
            <li>
              <Link to='/changelog'>{'Journal des modifications'}</Link>
            </li>
          </ul>
        </div>

        {/* Informations de Contact */}
        <div className='footer-contact'>
          <h4>{'Contact'}</h4>
          <p>
            {'Email'}:{' '}
            <a href='mailto:keurexpress@keurexpress.com'>
              keurexpress@keurexpress.com
            </a>
          </p>
          <p>
            {'Téléphone'}: <a href='tel:(316) 555-0116'>+(221) 77-519-01-04</a>
          </p>
          <p>{'Adresse'}: Senegal,Dkar,Keur Massar,Cite Ainoumady</p>
        </div>
      </div>
      <div className='footer-image-absolute'>
        <div className='first-footer-img'>
          <img src={a} alt='' />
        </div>
        <div className='second-footer-img'>
          <img src={b} alt='' />
        </div>
        <div className='third-footer-img'>
          <img src={b} alt='' />
        </div>
        <div className='four-footer-img'>
          <img src={c} alt='' />
        </div>
      </div>
      <div className='footer-copyright'>
        <p>
          {'Copyright'} {currentYear} <strong>Keur Express</strong> |{' '}
          {'Conçu par'}
          <a
            href='https://brandbes.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            AbsaTech
          </a>{' '}
          - {'Propulsé par'}{' '}
          <a
            href='adamadiouf2017@gmail.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            Adama Diouf
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
