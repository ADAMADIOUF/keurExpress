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
  const blog = await Blog.findById(req.params.id).populate('user', 'name email') // Populate author details

  if (!blog) {
    res.status(404)
    throw new Error('Blog not found')
  }

  res.status(200).json(blog)
})

// Update a blog post by ID
export const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, categories, image, status } = req.body
  const blogId = req.params.id

  // Find the blog by ID
  const blog = await Blog.findById(blogId)

  if (!blog) {
    res.status(404)
    throw new Error('Blog not found')
  }

  // Check if the logged-in user is the author of the blog
  if (blog.user.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error('You are not authorized to edit this blog')
  }

  // Update blog fields
  blog.title = title || blog.title
  blog.content = content || blog.content
  blog.categories = categories || blog.categories
  blog.image = image || blog.image
  blog.status = status || blog.status

  const updatedBlog = await blog.save()
  res.status(200).json(updatedBlog)
})

// Delete a blog post by ID
export const deleteBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id

  // Find the blog by ID
  const blog = await Blog.findById(blogId)
  if (!blog) {
    res.status(404)
    throw new Error('Blog not found')
  }

  // Check if the logged-in user is an admin or the one who created the blog
  if (
    blog.user.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    res.status(401)
    throw new Error('User not authorized to delete this blog')
  }

  // Attempt to delete the blog
  try {
    await Blog.findByIdAndDelete(blogId)
    res.status(200).json({ message: 'Blog deleted' })
  } catch (error) {
    console.error('Error deleting blog:', error)
    res.status(500).json({ message: 'Error deleting blog' })
  }
})
