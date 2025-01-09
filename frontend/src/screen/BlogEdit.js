import React, { useState, useEffect } from 'react'
import {
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from '../slices/blogApiSlice'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'

const defaultImage =
  'https://www.shutterstock.com/image-photo/young-african-businessman-real-estate-600nw-2125825859.jpg'

const BlogEdit = () => {
  const { id: blogId } = useParams()
  const navigate = useNavigate()

  // Fetch the blog data using the blogId
  const { data: post, error, isLoading } = useGetPostByIdQuery(blogId)
  const [updatePost] = useUpdatePostMutation()

  // Local state for the form data
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    author: '',
    image: defaultImage,
    categories: [],
    status: 'draft', // Default status
    readTime: 0,
    publishedDate: new Date(),
  })

  // Set the blog data to state once it's fetched
  useEffect(() => {
    if (post) {
      setBlogData({
        title: post.title || '',
        content: post.content || '',
        author: post.author || '',
        image: post.image || defaultImage,
        categories: post.categories || [],
        status: post.status || 'draft',
        readTime: post.readTime || 0,
        publishedDate: post.publishedDate || new Date(),
      })
    }
  }, [post])

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Handle categories (for adding/removing)
  const handleCategoriesChange = (e) => {
    const { value } = e.target
    setBlogData((prevData) => ({
      ...prevData,
      categories: value.split(',').map((item) => item.trim()), // Split comma-separated values
    }))
  }

  // Handle the image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const fileType = file.type.split('/')[0]
      if (fileType === 'image') {
        const reader = new FileReader()
        reader.onloadend = () => {
          setBlogData((prevData) => ({
            ...prevData,
            image: reader.result, // This stores the base64 string
          }))
        }
        reader.readAsDataURL(file)
      } else {
        toast.error('Please upload a valid image file')
      }
    }
  }

  // Handle the submit event to update the blog post
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await updatePost({ id: blogId, ...blogData })
      toast.success('Blog updated successfully')
      navigate('/admin/blogList') // Navigate back to the blog list
    } catch (error) {
      toast.error(error.message || 'Failed to update the blog')
    }
  }

  // Calculate read time based on content
  useEffect(() => {
    const wordCount = blogData.content.split(' ').length
    const readTime = Math.ceil(wordCount / 200) // 200 words per minute
    setBlogData((prevData) => ({
      ...prevData,
      readTime,
    }))
  }, [blogData.content])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div className='container'>
      <h1>Edit Blog Post</h1>

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Title</label>
          <input
            type='text'
            name='title'
            value={blogData.title}
            onChange={handleChange}
            className='form-control'
            required
          />
        </div>

        <div className='form-group'>
          <label>Content</label>
          <textarea
            name='content'
            value={blogData.content}
            onChange={handleChange}
            className='form-control'
            required
          />
        </div>

        <div className='form-group'>
          <label>Author</label>
          <input
            type='text'
            name='author'
            value={blogData.author}
            onChange={handleChange}
            className='form-control'
            required
          />
        </div>

        <div className='form-group'>
          <label>Categories (comma separated)</label>
          <input
            type='text'
            name='categories'
            value={blogData.categories.join(', ')}
            onChange={handleCategoriesChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Status</label>
          <select
            name='status'
            value={blogData.status}
            onChange={handleChange}
            className='form-control'
          >
            <option value='draft'>Draft</option>
            <option value='published'>Published</option>
          </select>
        </div>

        <div className='form-group'>
          <label>Read Time</label>
          <input
            type='text'
            name='readTime'
            value={`${blogData.readTime} minutes`}
            onChange={handleChange}
            className='form-control'
            readOnly
          />
        </div>

        <div className='form-group'>
          <label>Published Date</label>
          <input
            type='date'
            name='publishedDate'
            value={new Date(blogData.publishedDate).toISOString().split('T')[0]}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Image Upload</label>
          <input
            type='file'
            onChange={handleImageChange}
            className='form-control'
          />
          {blogData.image && (
            <img
              src={blogData.image}
              alt='Blog'
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                marginTop: '10px',
              }}
            />
          )}
        </div>

        <button type='submit' className='btn btn-primary'>
          Update Blog
        </button>
      </form>
    </div>
  )
}

export default BlogEdit
