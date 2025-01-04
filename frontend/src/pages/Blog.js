import React from 'react'
import HeroReusable from '../components/HeroResuable'
import { Link } from 'react-router-dom'
import { useGetPostsQuery } from '../slices/blogApiSlice'
import { useTranslation } from 'react-i18next'

const Blog = () => {
  const { t } = useTranslation()
  const { data: posts, error, isLoading } = useGetPostsQuery()

  if (isLoading) {
    return <p>{t('blog.loading')}</p>
  }

  if (error) {
    return <p>{t('blog.errorLoading')}</p>
  }

  return (
    <div className='blogs'>
      <div className='section-center'>
        <div className='home-about-container'>
          <article>
            <HeroReusable
              title={t('blog.title')}
              subtitle={t('blog.subtitle')}
            />
          </article>
          <article className='view-all-blog'>
            <button className='btn'>
              <Link to={'/all-blogs'}>{t('blog.viewAll')}</Link>
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
                    <strong>{t('blog.publishedOn')}:</strong>{' '}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>{t('blog.by')}:</strong> {blog.user.name}
                  </p>
                </div>
                <Link to={`/blog/${blog._id}`} className='btn btn-primary'>
                  {t('blog.readMore')}
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
