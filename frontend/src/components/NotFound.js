// src/components/NotFound.js
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.message}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to={"/"}>Go Back to home page</Link>
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
