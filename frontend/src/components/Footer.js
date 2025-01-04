import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import a from '../assets/f1.png'
import b from '../assets/f2.png'
import c from '../assets/f3.png'

const Footer = () => {
  const { t } = useTranslation()
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
          <p>{t('footer.about')}</p>
        </div>

        {/* Newsletter Signup */}
        <div className='footer-newsletter'>
          <h4>{t('footer.newsletterTitle')}</h4>
          <form>
            <input
              type='email'
              placeholder={t('footer.emailPlaceholder')}
              className='footer-input'
            />
            <button type='submit' className='btn'>
              {t('footer.subscribe')}
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className='footer-links'>
          <h4>{t('footer.quickLinks')}</h4>
          <ul>
            <li>
              <Link to='/'>{t('footer.home')}</Link>
            </li>
            <li>
              <Link to='/about'>{t('footer.aboutUs')}</Link>
            </li>
            <li>
              <Link to='/property'>{t('footer.property')}</Link>
            </li>
            <li>
              <Link to='/agent'>{t('footer.agent')}</Link>
            </li>
            <li>
              <Link to='/all-blogs'>{t('footer.blog')}</Link>
            </li>
            <li>
              <Link to='/contact'>{t('footer.contact')}</Link>
            </li>
          </ul>
        </div>

        {/* Utility Pages */}
        <div className='footer-utility'>
          <h4>{t('footer.utilityPages')}</h4>
          <ul>
            <li>
              <Link to='/password-protected'>
                {t('footer.passwordProtected')}
              </Link>
            </li>
            <li>
              <Link to='/404'>{t('footer.pageNotFound')}</Link>
            </li>
            <li>
              <Link to='/style-guide'>{t('footer.styleGuide')}</Link>
            </li>
            <li>
              <Link to='/license'>{t('footer.license')}</Link>
            </li>
            <li>
              <Link to='/changelog'>{t('footer.changelog')}</Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className='footer-contact'>
          <h4>{t('footer.contact')}</h4>
          <p>
            {t('footer.email')}:{' '}
            <a href='mailto:contact@nestbes.com'>contact@nestbes.com</a>
          </p>
          <p>
            {t('footer.phone')}: <a href='tel:(316) 555-0116'>(316) 555-0116</a>
          </p>
          <p>
            {t('footer.address')}: 1901 Thornridge Cir. Shiloh, Hawaii 81063
          </p>
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
          {t('footer.copyright')} {currentYear} <strong>Keur Express</strong> |{' '}
          {t('footer.designedBy')}
          <a
            href='https://brandbes.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            AbsaTech
          </a>{' '}
          - {t('footer.poweredBy')}{' '}
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
