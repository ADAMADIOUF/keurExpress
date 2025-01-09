import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useResetPasswordMutation } from '../slices/userApiSlice' // Ajustez l'importation en fonction de votre API slice
import Loader from '../components/Loading'

const ResetPassword = () => {
  const { token } = useParams() // Extraire le token de l'URL
  const navigate = useNavigate() // Hook pour naviguer vers la page de connexion
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
      return
    }

    try {
      await resetPassword({ token, password }).unwrap()
      toast.success('Mot de passe réinitialisé avec succès !')
      navigate('/login') // Naviguer vers la page de connexion après le succès
    } catch (error) {
      toast.error(
        error?.data?.message || 'Échec de la réinitialisation du mot de passe'
      )
    }
  }

  return (
    <div className='reset-password-container'>
      <h2>Réinitialiser le mot de passe</h2>
      <form onSubmit={submitHandler}>
        <div className='form-group'>
          <label htmlFor='password'>Nouveau mot de passe</label>
          <input
            type='password'
            id='password'
            placeholder='Entrez le nouveau mot de passe'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirmer le mot de passe</label>
          <input
            type='password'
            id='confirmPassword'
            placeholder='Confirmer le nouveau mot de passe'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='update-button'>
          Réinitialiser le mot de passe
        </button>
        {isLoading && <Loader />}
      </form>
    </div>
  )
}

export default ResetPassword
