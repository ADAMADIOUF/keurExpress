import React from 'react'
import { useSelector } from 'react-redux'
import { useGetPostByIdQuery } from '../slices/blogApiSlice'
import { useParams } from 'react-router-dom'

const SingleBlog = () => {
  const { id: blogId } = useParams()
  const { data: post, error, isLoading, refetch } = useGetPostByIdQuery(blogId)
  const { userInfo } = useSelector((state) => state.auth)

  if (isLoading) return <p>Chargement...</p> // Afficher l'état de chargement
  if (error) return <p>Erreur lors de la récupération du blog</p> // Afficher l'état d'erreur
  if (!post) return <p>Blog non trouvé</p> // Afficher le message si aucun blog n'est trouvé

  return (
    <div>
      <div className='single-blog-container'>
        <h1>{post.title}</h1> {/* Afficher le titre du blog */}
        <div className='author-info'>
          <p>Publié le : {new Date(post.createdAt).toLocaleDateString()}</p>
          <h3>Publié par : "{post.user.name}"</h3>{' '}
          {/* Afficher le nom de l'auteur */}
        </div>
        <div className='post-content'>
          <p>{post.content}</p> {/* Afficher le contenu du blog */}
        </div>
        {post.image && (
          <div className='post-image'>
            <img src={post.image} alt={post.title} />
          </div>
        )}
      </div>
    </div>
  )
}

export default SingleBlog
