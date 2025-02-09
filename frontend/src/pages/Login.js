import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  // Redirige l'utilisateur s'il est déjà connecté
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const [login, { isLoading }] = useLoginMutation()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()

      dispatch(setCredentials(res))
      navigate(redirect)
    } catch (error) {
      setError(error?.data?.message || error.error)
      toast.error(
        error?.data?.message || 'Échec de la connexion. Veuillez réessayer.'
      )
    }
  }

  return (
    <div style={styles.container}>
      <h2>Se connecter</h2>
      <form onSubmit={submitHandler} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}

        <label style={styles.label}>
          Email
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Mot de passe
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <button type='submit' style={styles.button}>
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      <p style={styles.orText}>ou</p>

      <p style={styles.signupText}>
        <Link to='/forgot-password'>Mot de passe oublié ?</Link>
        Vous n'avez pas de compte ? <Link to='/register'>S'inscrire</Link>
      </p>
      <div className='return-to-store'>
        <Link to='/'>Retour à l'accueil</Link>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    textAlign: 'left',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  googleButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  orText: {
    margin: '20px 0',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: '15px',
  },
}

export default Login
