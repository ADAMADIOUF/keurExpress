import React, { useState, useRef, useEffect } from 'react'
import { FaBars, FaHeart, FaTimes, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { links, social } from '../data'
import { logout } from '../slices/authSlice'

import logo from "../assets/keur-logo1.png"
import { useLogoutMutation } from '../slices/userApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'
const Navbar = () => {
   const { t } = useTranslation()
  const [showLinks, setShowLinks] = useState(false)
  const linksContainerRef = useRef(null)
  const linksRef = useRef(null)

  const toggleLinks = () => {
    setShowLinks(!showLinks)
  }

  const [isGoogleLogin, setIsGoogleLogin] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Get the user info from Redux state
  const { userInfo } = useSelector((state) => state.auth)

  // Use the logout mutation from userApiSlice
  const [logoutApiCall] = useLogoutMutation()

  
  useEffect(() => {
    if (userInfo?.provider === 'google') {
      setIsGoogleLogin(true)
    } else if (userInfo?.email) {
      setIsGoogleLogin(false)
    }

    
    if (userInfo?.role === 'isAdmin') {
      navigate('/admin/dashboard')
    }
  }, [userInfo, navigate]) 
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap() 
      dispatch(logout()) 
      navigate('/') 
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (linksContainerRef.current) {
      const linksHeight = linksRef.current.getBoundingClientRect().height
      linksContainerRef.current.style.height = showLinks
        ? `${linksHeight}px`
        : '0px'
    }
  }, [showLinks])


  return (
    <nav className='nav'>
      <div className='nav-center'>
        <div className='nav-flex'>
          <div className='nav-header'>
          <img src={logo} alt="" className="logo" />
            <button className='nav-toggle' onClick={toggleLinks}>
              {showLinks ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <div className='links-container' ref={linksContainerRef}>
            <ul className='links' ref={linksRef}>
              {links.map((link) => {
                const { id, url, text, className } = link
                return (
                  <li key={id}>
                    <a
                      href={url}
                      className={`${className ? className : ''} no-wrap`}
                    >
                      {t(text)}
                    </a>
                  </li>
                )
              })}
              <LanguageSwitcher />
            </ul>
          </div>
        </div>

        {!userInfo && (
          <ul className='social-icons'>
            {social.map((socialIcon) => {
              const { id, url, icon } = socialIcon
              return (
                <li key={id}>
                  <a href={url}>{icon}</a>
                </li>
              )
            })}
          </ul>
        )}

        {!userInfo ? (
          <div className='profle-flex'>
            <li style={styles.navItem}>
              <Link to='/login' style={styles.link}>
                Login
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link to='/register' style={styles.link}>
                Register
              </Link>
            </li>
          </div>
        ) : (
          // If user info exists, show profile and logout buttons
          <>
            <li style={styles.navItem}>
              <Link to='/profile' style={styles.link}>
                <FaUser /> {t('Profile')}
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link to='/wishlist' style={styles.link}>
                <FaHeart /> {t('Wishlist')}
              </Link>
            </li>
            <span className='username'>{userInfo.name}</span>
            {userInfo.image ? (
              <img
                src={userInfo.profileImage}
                alt='User Avatar'
                className='avatar-img'
              />
            ) : (
              <FaUser />
            )}
            {userInfo.role === 'admin' && (
              <>
                <Link to='/admin/dashboard' className='dropdown-item'>
                  {t('Dashboard')}
                </Link>
                <Link to='/admin/propertiesList' className='dropdown-item'>
                  {t('All properties')}
                </Link>
                <Link to='/admin/userlist' className='dropdown-item'>
                  {t('All Users')}
                </Link>
              </>
            )}
            <li style={styles.navItem}>
              <button onClick={logoutHandler} className='logout-button'>
                {t('Logout')} {isGoogleLogin ? `(Google)` : ''}
              </button>
            </li>
          </>
        )}
      </div>

      {/* {userInfo?.provider === 'google' && (
        <div style={styles.userInfo}>
          <img
            src={userInfo?.photo || 'https://via.placeholder.com/150'}
            alt='User Profile'
            style={styles.userImage}
          />
          <p style={styles.userName}>
            {userInfo?.displayName || userInfo?.name}
          </p>
        </div>
      )} */}
    </nav>
  )
}

export default Navbar

const styles = {
  navItem: {
    listStyleType: 'none',
    margin: '0 10px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
  },
  userImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  userName: {
    fontWeight: 'bold',
  },
}
