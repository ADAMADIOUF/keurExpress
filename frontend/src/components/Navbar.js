import React, { useState, useRef, useEffect } from 'react'
import { FaBars, FaHeart, FaTimes, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { links, social } from '../data'
import { logout } from '../slices/authSlice'

import logo from "../assets/hero.png"
import { useLogoutMutation } from '../slices/userApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const Navbar = () => {
  
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
  const handleLogoClick = () => {
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
            <Link to={'/'}>
              {' '}
              <button
                onClick={handleLogoClick}
                style={{ border: 'none', background: 'none' }}
              >
                <img src={logo} alt='Logo' className='logo' />
              </button>
            </Link>
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
                      {text}
                    </a>
                  </li>
                )
              })}
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
          <div className='profile-flex'>
            <li style={styles.navItem} className='no-wrap'>
              <Link to='/login' style={styles.link}>
                Connexion
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link to='/register' style={styles.link}>
                S'inscrire
              </Link>
            </li>
          </div>
        ) : (
          <>
            <div className='container-profile'>
              <li style={styles.navItem}>
                <Link to='/profile' style={styles.link} className='no-wrap'>
                  <FaUser /> {'Profil'}
                </Link>
              </li>
              <li style={styles.navItem} className='no-wrap'>
                <Link to='/wishlist' style={styles.link}>
                  <FaHeart /> {'Liste de souhaits'}
                </Link>
              </li>

              <div className='avatar'>
                {userInfo.image ? (
                  <img
                    src={userInfo.image}
                    alt='User Avatar'
                    className='avatar-img'
                  />
                ) : (
                  <span className='username'>{userInfo.name}</span>
                )}
              </div>
            </div>
            <div>
              <div>
                {userInfo.role === 'admin' && (
                  <div className='admin-nav'>
                    <Link
                      to='/admin/dashboard'
                      className='dropdown-item no-wrap'
                    >
                      {'Tableau de bord'}
                    </Link>
                    <Link
                      to='/admin/propertiesList'
                      className='dropdown-item no-wrap'
                    >
                      {'Toutes les propriétés'}
                    </Link>
                    <Link
                      to='/admin/agentList'
                      className='dropdown-item no-wrap'
                    >
                      {'Toutes les agents'}
                    </Link>
                    <Link
                      to='/admin/partnerList'
                      className='dropdown-item no-wrap'
                    >
                      {'Toutes les partenairs'}
                    </Link>
                    <Link
                      to='/admin/blogList'
                      className='dropdown-item no-wrap'
                    >
                      {'Toutes les blogs'}
                    </Link>
                    <Link
                      to='/admin/userlist'
                      className='dropdown-item no-wrap'
                    >
                      {'Tous les utilisateurs'}
                    </Link>
                  </div>
                )}
              </div>
              <div>
                <li style={styles.navItem}>
                  <button
                    onClick={logoutHandler}
                    className='logout-button no-wrap'
                  >
                    Se déconnecter
                  </button>
                </li>
              </div>
            </div>
          </>
        )}
      </div>
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
