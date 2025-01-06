import React from 'react'
import { nanoid } from 'nanoid'

import { FaBehance, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'

export const links = [
  {
    id: nanoid(),
    url: '/',
    text: 'accueil', // "home" in French
  },
  {
    id: nanoid(),
    url: '/about',
    text: 'à propos', // "about" in French
  },
  {
    id: nanoid(),
    url: '/property',
    text: 'propriété', // "property" in French
  },
  {
    id: nanoid(),
    url: '/partners',
    text: 'partenaires', // "partners" in French
  },
  {
    id: nanoid(),
    url: '/all-agents',
    text: 'agents', // "agents" in French
  },
  {
    id: nanoid(),
    url: '/contact',
    text: 'contactez-nous', // "contact Us" in French
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
