import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Introuvable</h1>
      <p style={styles.message}>
        Désolé, la page que vous recherchez n'existe pas.
      </p>
      <Link to={'/'}>Retourner à la page d'accueil</Link>
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#333',
  },
  message: {
    fontSize: '1.2rem',
    color: '#777',
  },
}

export default NotFound
