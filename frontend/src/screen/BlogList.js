import React, { useState } from 'react'
import {
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
} from '../slices/blogApiSlice'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Error from '../components/Error'
import Loading from '../components/Loading'

const BlogList = () => {
  const { data: blogs, error, isLoading, refetch } = useGetPostsQuery()
  const [createBlog, { isLoading: loadingCreate }] = useAddPostMutation()
  const [deletePost, { isLoading: loadingDelete }] = useDeletePostMutation()

  const [newBlogData, setNewBlogData] = useState({
    title: '',
    content: '',
    categories: [],
    image: '',
    status: 'draft',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const createBlogHandler = async () => {
    const newBlog = {
      title: 'Sample Blog Title',
      content: 'Sample content for the blog post.',
      categories: ['Tech', 'React'],
      image: 'https://via.placeholder.com/500',
      status: 'published',
    }

    if (window.confirm('Êtes-vous sûr de vouloir créer un nouvel article ?')) {
      try {
        // Send the new blog data to the backend
        await createBlog(newBlog)
        refetch() // Refresh the blog list
        toast.success('Article créé avec succès')
        setNewBlogData({}) // Reset the form after successful submission
      } catch (error) {
        toast.error("Échec de la création de l'article")
      }
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await deletePost(id)
        refetch()
        toast.success('Article supprimé avec succès')
      } catch (error) {
        toast.error("Échec de la suppression de l'article")
      }
    }
  }

  if (isLoading || loadingCreate || loadingDelete) {
    return <Loading />
  }

  if (error) {
    return <Error message='Erreur lors du chargement des articles.' />
  }

  return (
    <div className='container'>
      <div className='header'>
        <h1>Liste des articles de blog</h1>
        <button
          onClick={createBlogHandler}
          disabled={loadingCreate}
          className='btn btn-primary'
        >
          {loadingCreate ? 'Création en cours...' : 'Créer un article'}
        </button>
      </div>

      {loadingDelete && <Loading message="Suppression de l'article..." />}

      <div className='blog-list'>
        {blogs?.length === 0 ? (
          <p>Aucun article trouvé</p>
        ) : (
          blogs?.map((blog) => (
            <div key={blog._id} className='blog-card'>
              <img
                src={blog.image || 'https://via.placeholder.com/500'}
                alt={blog.title}
                className='blog-image'
              />
              <div className='blog-info'>
                <h2>{blog.title}</h2>
                <p>{blog.content.substring(0, 100)}...</p>
                <p>{blog.status}</p>
                <p>{new Date(blog.publishedDate).toLocaleDateString()}</p>
              </div>

              <div className='blog-actions'>
                <Link
                  to={`/admin/blogList/${blog._id}/edit`}
                  className='btn btn-edit'
                >
                  <FaEdit /> Modifier
                </Link>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className='btn btn-delete'
                  disabled={loadingDelete}
                >
                  <FaTrash /> Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default BlogList
