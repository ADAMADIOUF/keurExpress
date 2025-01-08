import React from 'react'
import HeroReusable from '../components/HeroResuable'
import { Link } from 'react-router-dom'
import { useGetPostsQuery } from '../slices/blogApiSlice'

const Blog = () => {
 
  const { data: posts, error, isLoading } = useGetPostsQuery()

  if (isLoading) {
    return <p>{('blog.loading')}</p>
  }

  if (error) {
    return <p>{('blog.errorLoading')}</p>
  }

  return (
    <div className='blogs'>
      <div className='section-center'>
        <div className='home-about-container'>
          <article>
            <HeroReusable
              title={'Notre Blog'}
              subtitle={`Notre Blog
Restez Informé Avec Notre Blog Immobilier
Découvrez les dernières informations, conseils et actualités du monde de l'immobilier pour vous aider à prendre des décisions éclairées.`}
            />
          </article>
          <article className='view-all-blog'>
            <button className='btn'>
              <Link to={'/all-blogs'}>Voir Tous les Blogs</Link>
            </button>
          </article>
        </div>
        <div className='second-container-blog'>
          {posts.slice(0, 3).map((blog, index) => (
            <div key={index} className='blog-card'>
              <img src={blog.image} alt={blog.title} className='blog-image' />
              <div className='blog-content'>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <div className='blog-meta'>
                  <span>{blog.publishedDate}</span>
                  <p>
                    <strong>{'Publié le'}:</strong>{' '}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>{'Par'}:</strong> {blog.user.name}
                  </p>
                </div>
                <Link to={`/blog/${blog._id}`} className='btn btn-primary'>
                  {'Lire plus'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
