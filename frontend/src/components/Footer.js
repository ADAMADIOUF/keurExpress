import React from 'react'
import { Link } from 'react-router-dom'
import a from "../assets/f1.png"
import b from '../assets/f2.png'
import c from '../assets/f3.png'
const Footer = () => {
   const currentYear = new Date().getFullYear()
  return (
    <footer className='footer'>
      <div className='footer-container section-center'>
      
        <div className='footer-about'>
          <img
            src='https://example.com/logo.png'
            alt='NestBes Logo'
            className='footer-logo'
          />
          <p>
            Embark on a journey to find your ideal living space with NestBes.
            Explore a curated selection of properties.
          </p>
        </div>

        {/* Newsletter Signup */}
        <div className='footer-newsletter'>
          <h4>Enter Your Email</h4>
          <form>
            <input
              type='email'
              placeholder='Enter your email'
              className='footer-input'
            />
            <button type='submit' className='btn'>
              Subscribe
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className='footer-links'>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About us</Link>
            </li>
            <li>
              <Link to='/property'>Property</Link>
            </li>
            <li>
              <Link to='/agent'>Agent</Link>
            </li>
            <li>
              <Link to='/blog'>Blog</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
          </ul>
        </div>

        {/* Utility Pages */}
        <div className='footer-utility'>
          <h4>Utility Pages</h4>
          <ul>
            <li>
              <Link to='/password-protected'>Password Protected</Link>
            </li>
            <li>
              <Link to='/404'>404 Not Found</Link>
            </li>
            <li>
              <Link to='/style-guide'>Style Guide</Link>
            </li>
            <li>
              <Link to='/license'>License</Link>
            </li>
            <li>
              <Link to='/changelog'>Changelog</Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className='footer-contact'>
          <h4>Contact</h4>
          <p>
            Email: <a href='mailto:contact@nestbes.com'>contact@nestbes.com</a>
          </p>
          <p>
            Phone: <a href='tel:(316) 555-0116'>(316) 555-0116</a>
          </p>
          <p>Address: 1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
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
          Copyright© {currentYear} <strong>Keur Express</strong> | Designed by{' '}
          <a
            href='https://brandbes.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            Brandbes
          </a>{' '}
          - Powered by{' '}
          <a
            href='https://webflow.com'
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
