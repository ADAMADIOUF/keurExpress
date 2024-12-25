import React from 'react'
import { nanoid } from 'nanoid'

import { FaBehance, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'

// Links with nanoid for unique IDs
export const links = [
  {
    id: nanoid(),
    url: '/',
    text: 'home',
  },
  {
    id: nanoid(),
    url: '/about',
    text: 'about',
  },
  {
    id: nanoid(),
    url: '/property',
    text: 'property',
  },

  {
    id: nanoid(),
    url: '/partners',
    text: 'partners',
  },
  {
    id: nanoid(),
    url: '/all-agents',
    text: 'Agents',
  },
  {
    id: nanoid(),
    url: '/contact',
    text: 'contact Us',
    className: 'btn-contact', // Add a custom class for styling
  },
]


// Social media links with nanoid for unique IDs
export const social = [
  {
    id: nanoid(),
    url: 'https://www.facebook.com',
    icon: <FaFacebook />,
  },
  {
    id: nanoid(),
    url: 'https://www.twitter.com',
    icon: <FaTwitter />,
  },
  {
    id: nanoid(),
    url: 'https://www.linkedin.com',
    icon: <FaLinkedin />,
  },
  {
    id: nanoid(),
    url: 'https://www.behance.net',
    icon: <FaBehance />,
  },
]
