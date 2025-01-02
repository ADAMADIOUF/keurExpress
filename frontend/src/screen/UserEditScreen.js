import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../components/Loading'
import Message from '../components/Error'
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../slices/userApiSlice'

const UserEditScreen = () => {
  const { id: userId } = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('user')
  const { data: user, isLoading, error } = useGetUserDetailsQuery(userId)
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setRole(user.role || 'user') // Default to 'user' if role is undefined
    }
  }, [user])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await updateUser({ userId, name, email, role })
      toast.success('User updated successfully')
      navigate('/admin/userlist')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <div className='edit-container'>
      <Link to={`/admin/userlist`} className='btn-back'>
        Go Back
      </Link>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <form onSubmit={submitHandler} className='form'>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='role'>Role</label>
            <select
              id='role'
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value='user'>User</option>
              <option value='seller'>Seller</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
          <button type='submit' className='btn-update'>
            Update
          </button>
        </form>
      )}
    </div>
  )
}

export default UserEditScreen
