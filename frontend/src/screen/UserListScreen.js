import React from 'react'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa'
import { useGetUsersQuery, useDeleteUserMutation } from '../slices/userApiSlice'
import Loader from '../components/Loading'
import Message from '../components/Error'
import { toast } from 'react-toastify'

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery()
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation()

  const deleteHandler = async (id, role) => {
    if (role === 'admin') {
      toast.error('Admin users cannot be deleted.')
      return
    }

    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id)
        refetch()
        toast.success('User deleted successfully')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  return (
    <div className='user-list-container'>
      <h1>Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='user-list'>
          {users.map((user) => (
            <div className='user-card' key={user._id}>
              <div className='user-info'>
                <div>ID: {user._id}</div>
                <div>Name: {user.name}</div>
                <div>
                  Email: <a href={`mailto:${user.email}`}>{user.email}</a>
                </div>
                <div>
                  Role:{' '}
                  {user.role === 'admin' ? (
                    <span>
                      <FaCheck className='fa-check' /> Admin
                    </span>
                  ) : user.role === 'seller' ? (
                    <span>
                      <FaCheck className='fa-check' /> Seller
                    </span>
                  ) : (
                    <span>
                      <FaCheck className='fa-check' /> User
                    </span>
                  )}
                </div>
              </div>
              <div className='user-actions'>
                <Link to={`/admin/user/${user._id}/edit`}>
                  <button className='btn btn-light'>
                    <FaEdit />
                  </button>
                </Link>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteHandler(user._id, user.role)}
                  disabled={user.role === 'admin'} // Disable delete for admin
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserListScreen
