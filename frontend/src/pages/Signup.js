import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useRegisterMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [register, { isLoading }] = useRegisterMutation()

  const submitHandler = async (e) => {
    e.preventDefault()

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    try {
      const res = await register({ name, email, password }).unwrap()

      // Dispatch des informations d'utilisateur dans le store Redux
      dispatch(setCredentials(res))

      // Rediriger l'utilisateur vers la page de profil après une inscription réussie
      navigate('/profile')
    } catch (error) {
      setError(
        error?.data?.message || "Échec de l'inscription. Veuillez réessayer."
      )
      toast.error(
        error?.data?.message || "Échec de l'inscription. Veuillez réessayer."
      )
    }
  }

  return (
    <div style={styles.container}>
      <h2>S'inscrire</h2>
      <form onSubmit={submitHandler} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}

        <label style={styles.label}>
          Nom
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </label>

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

        <label style={styles.label}>
          Confirmer le mot de passe
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <button type='submit' style={styles.button}>
          {isLoading ? 'Enregistrement...' : "S'inscrire"}
        </button>
      </form>

      <p style={styles.loginText}>
        Vous avez déjà un compte ? <Link to='/login'>Se connecter</Link>
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
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: '15px',
  },
}

export default Signup
