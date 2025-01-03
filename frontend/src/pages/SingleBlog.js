import React from 'react'
import { useSelector } from 'react-redux'
import { useGetPostByIdQuery } from '../slices/blogApiSlice'
import { useParams } from 'react-router-dom'

const SingleBlog = () => {
  const { id: blogId } = useParams()
  const { data: post, error, isLoading, refetch } = useGetPostByIdQuery(blogId)
  const { userInfo } = useSelector((state) => state.auth)
  if (isLoading) return <p>Loading...</p> // Show loading state
  if (error) return <p>Error fetching blog post</p> // Show error state
  if (!post) return <p>Blog not found</p> // Show message if no post is found

  return (
    <div>
      <div className='single-blog-container'>
        <h1>{post.title}</h1> {/* Display blog title */}
        <div className='author-info'>
          <p>Published on: {new Date(post.createdAt).toLocaleDateString()}</p>
          <h3>Post By "{post.user.name}"</h3> {/* Display author's name */}
        </div>
        <div className='post-content'>
          <p>{post.content}</p> {/* Display the content of the blog */}
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
