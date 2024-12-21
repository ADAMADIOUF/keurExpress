import React from 'react'
import HeroReusable from '../components/HeroResuable'
import { Link } from 'react-router-dom'

const Blog = () => {
  const blogs = [
    {
      title: 'Exploring the Beauty of Nature',
      description:
        'Discover the most stunning natural landscapes and how to preserve them for future generations.',
      image:
        'https://cdn.prod.website-files.com/66a62e99c9fbe25684dce4d9/66a7505d03ec087e1a2a113a_Blog%20Post%20Thumbnail6.jpg',
      date: 'July 29, 2024',
      readTime: '9 min to read',
    },
    {
      title: 'Mastering JavaScript Fundamentals',
      description:
        'A comprehensive guide to learning JavaScript, from basic concepts to advanced techniques.',
      image:
        'https://cdn.prod.website-files.com/66a62e99c9fbe25684dce4d9/66a7502a125c5424412e17a2_Blog%20Post%20Thumbnail5.jpg',
      date: 'July 29, 2024',
      readTime: '9 min to read',
    },
    {
      title: 'Top 10 Travel Destinations for 2024',
      description:
        'Plan your next vacation with our list of the most popular and exotic travel destinations this year.',
      image:
        'https://cdn.prod.website-files.com/66a62e99c9fbe25684dce4d9/66a74ffc125c5424412df974_Blog%20Post%20Thumbnail4.jpg',
      date: 'July 29, 2024',
      readTime: '9 min to read',
    },
    {
      title: 'Healthy Living: Tips and Tricks',
      description:
        'Explore practical tips for maintaining a healthy lifestyle through diet, exercise, and mindfulness.',
      image: 'https://example.com/images/healthy-living.jpg',
      date: 'July 29, 2024',
      readTime: '9 min to read',
    },
    {
      title: 'Tech Innovations to Watch in 2024',
      description:
        'Stay ahead of the curve with our overview of the most exciting tech trends and gadgets this year.',
      image: 'https://example.com/images/tech.jpg',
      date: 'July 29, 2024',
      readTime: '9 min to read',
    },
    {
      title: 'The Art of Minimalist Living',
      description:
        'Learn how to simplify your life and find joy in minimalism with actionable tips and insights.',
      image: 'https://example.com/images/minimalism.jpg',
      date: 'July 29, 2024',
      readTime: '9 min to read',
    },
  ]

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
          <article className='view-all-blog'>
            <button className='btn'>
              <Link to={'/all-blogs'}>View All Blogs</Link>
            </button>
          </article>
        </div>
        <div className='second-container-blog'>
          {blogs.slice(0, 3).map((blog, index) => (
            <div key={index} className='blog-card'>
              <img src={blog.image} alt={blog.title} className='blog-image' />
              <div className='blog-content'>
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <div className='blog-meta'>
                  <span>{blog.date}</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
