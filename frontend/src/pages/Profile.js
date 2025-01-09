import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useProfileMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useUploadPostImageMutation } from '../slices/userApiSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [image, setImage] = useState(null) // Base64 or URL

  const { userInfo } = useSelector((state) => state.auth)
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation()
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadPostImageMutation()

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name)
      setEmail(userInfo.email)
      setImage(userInfo.image)
    }
  }, [userInfo])

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    try {
      const res = await uploadProductImage(formData).unwrap()
      setImage(res.image)
      toast.success(res.message)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      try {
        const updatedProfile = {
          _id: userInfo._id,
          name,
          email,
          password,
          image,
        }
        const res = await updateProfile(updatedProfile).unwrap()
        dispatch(setCredentials(res))
        toast.success('Profile updated successfully')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  if (loadingUpdateProfile || loadingUpload) return <p>Loading...</p>

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={submitHandler}>
        <label>Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete='name' // Added autocomplete attribute
        />
        <label>Email</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='email' // Added autocomplete attribute
        />
        <label>Password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='new-password' // Added autocomplete attribute for new passwords
        />
        <label>Confirm Password</label>
        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete='new-password' // Added autocomplete attribute for new passwords
        />
        <label>Profile Image</label>
        <input
          type='file'
          onChange={uploadFileHandler}
          autoComplete='off' // Disable autocomplete for file inputs
        />
        {image && <img src={image} alt='Profile Preview' />}
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}

export default Profile
