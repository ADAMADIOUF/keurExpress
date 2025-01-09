import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useForgotPasswordMutation } from '../slices/userApiSlice'
import Loader from '../components/Loading'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await forgotPassword({ email }).unwrap()
      toast.success(
        'Un lien de réinitialisation du mot de passe a été envoyé à votre email.'
      )
      navigate('/login')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='form-container'>
      <h1>Mot de passe oublié</h1>
      <form onSubmit={submitHandler} className='forgot-password-form'>
        <div className='form-group'>
          <label htmlFor='email'>Adresse e-mail</label>
          <input
            type='email'
            id='email'
            placeholder='Entrez votre email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type='submit' className='btn' disabled={loading || isLoading}>
          Envoyer le lien de réinitialisation
        </button>

        {loading || isLoading ? <Loader /> : null}
      </form>

      <div className='redirect'>
        <p>
          Vous vous souvenez de votre mot de passe ?{' '}
          <Link to='/login'>Se connecter</Link>
        </p>
      </div>
    </div>
  )
}

export default ForgetPassword
