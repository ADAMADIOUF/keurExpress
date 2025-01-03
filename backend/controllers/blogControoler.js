import Blog from '../models/Blog.js'
import asyncHandler from '../middleware/asyncHandler.js'

// Create a new blog post
export const createBlog = asyncHandler(async (req, res) => {
  const { title, content, categories, image, status } = req.body

  // Check if user is available
  if (!req.user) {
    res.status(401)
    throw new Error('Not authorized. User not found.')
  }

  const user = req.user._id

  const blog = new Blog({
    title,
    content,
    user, // Include the authenticated user
    categories,
    image,
    status,
  })

  const createdBlog = await blog.save()
  res.status(201).json(createdBlog)
})
// Get all blog posts (can be filtered by status, categories, etc.)
export const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ status: 'published' })
    .populate('user', 'name email') // Populating the user (author) information
    .sort({ createdAt: -1 }) // Sort blogs by newest first
  res.status(200).json(blogs)
})

// Get a single blog post by ID
export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate('user', 'name email') // Populate author details
    

  if (!blog) {
    res.status(404)
    throw new Error('Blog not found')
  }

  res.status(200).json(blog)
})
