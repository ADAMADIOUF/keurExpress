import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  useProfileMutation,
  useUploadPostImageMutation,
} from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [image, setImage] = useState('')
  const { userInfo } = useSelector((state) => state.auth)

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation()
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadPostImageMutation()

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      setName(userInfo.name || '')
      setEmail(userInfo.email || '')
      setImage(userInfo.image || '')
    }
  }, [userInfo, navigate])

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])

    try {
      const res = await uploadProductImage(formData).unwrap()
      toast.success(res.message)
      setImage(res.image)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const handleDeleteAvatar = () => {
    setImage('')
    toast.info('Avatar removed')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords don't match")
      return
    }

    try {
      const updatedUser = await updateProfile({
        name,
        email,
        password,
        image,
      }).unwrap()

      dispatch(setCredentials(updatedUser))
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update profile')
    }
  }

  return (
    <div className='profile-container'>
      <h2 className='profile-title'>Update Profile</h2>
      <form className='profile-form' onSubmit={handleSubmit}>
        <label className='profile-label'>Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete='name'
          className='profile-input'
        />
        <label className='profile-label'>Email</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='email'
          className='profile-input'
        />
        <label className='profile-label'>Password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='new-password'
          className='profile-input'
        />
        <label className='profile-label'>Confirm Password</label>
        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete='new-password'
          className='profile-input'
        />
        <div className='profile-image-section'>
          <label className='profile-label'>Image</label>
          <input
            type='text'
            placeholder='Enter image URL'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className='profile-input'
          />
          <input
            type='file'
            onChange={uploadFileHandler}
            className='profile-file-input'
          />
          {image && (
            <div className='avatar-preview'>
              <img src={image} alt='Avatar Preview' className='avatar-img' />
              <button
                type='button'
                onClick={handleDeleteAvatar}
                className='delete-avatar-btn'
              >
                Delete Avatar
              </button>
            </div>
          )}
        </div>
        <button
          type='submit'
          disabled={loadingUpdateProfile || loadingUpload}
          className='submit-btn'
        >
          {loadingUpdateProfile || loadingUpload
            ? 'Updating...'
            : 'Update Profile'}
        </button>
      </form>
    </div>
  )
}

export default Profile
