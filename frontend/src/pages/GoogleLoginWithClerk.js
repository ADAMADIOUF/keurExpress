import React, { useState, useEffect } from 'react'
import { useClerkGoogleLoginMutation } from '../slices/userApiSlice'
import { GoogleLogin } from 'react-google-login'

const GoogleLoginWithClerk = () => {
  const [clerkGoogleLogin, { isLoading, error }] = useClerkGoogleLoginMutation()
  const [loginError, setLoginError] = useState(null)

  useEffect(() => {
    const loadGoogleAPI = () => {
      if (!window.gapi) return
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        })
      })
    }

    loadGoogleAPI()
  }, [])

  const handleLogin = async (response) => {
    if (response.error) {
      console.error('Google login failed:', response.error)
      setLoginError(`Google login failed: ${response.error}`)
      return
    }

    const googleToken = response.tokenId // The token received from Google

    try {
      // Call Clerk Google login with the token
      const result = await clerkGoogleLogin({ token: googleToken }).unwrap()
      console.log('Logged in with Clerk:', result)
    } catch (error) {
      console.error('Error logging in with Clerk:', error)
      setLoginError('Authentication with Clerk failed. Please try again.')
    }
  }

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} // Use environment variable for client ID
        buttonText='Login with Google'
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
      />
      {isLoading && <p>Logging in...</p>}
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  )
}

export default GoogleLoginWithClerk
