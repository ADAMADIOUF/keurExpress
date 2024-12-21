// src/components/Loading.js
import React from 'react'

const Loading = () => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.message}>Loading...</p>
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  spinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 2s linear infinite',
    margin: '0 auto',
  },
  message: {
    fontSize: '1.5rem',
    color: '#333',
    marginTop: '10px',
  },
}

export default Loading
