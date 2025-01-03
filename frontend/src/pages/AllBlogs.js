import React from 'react'
import HeroReusable from '../components/HeroResuable'
import { Link } from 'react-router-dom'
import { useGetPostsQuery } from '../slices/blogApiSlice'

const AllBlogs = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery()
  console.log(posts)
  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error loading posts.</p>
  }

  return (
    <div className='blogs'>
      <div className='section-center'>
        <div className='home-about-container'>
          <article>
            <HeroReusable
              title={'Our Blog'}
              subtitle={'Stay Informed With Our Real Estate Blog'}
            />
          </article>
          
        </div>
        <div className='second-container-blog'>
          {posts.map((blog, index) => (
            <div key={index} className='blog-card'>
              <img src={blog.image} alt={blog.title} className='blog-image' />
              <div className='blog-content'>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <div className='blog-meta'>
                  <span>{blog.publishedDate}</span>
                 
                  <p>
                    <strong>Published on:</strong>{' '}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>By:</strong> {blog.user.name}
                  </p>
                </div>
                <Link to={`/blog/${blog._id}`} className='btn btn-primary'>
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllBlogs
