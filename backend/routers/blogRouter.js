import express from 'express'
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from '../controllers/blogControoler.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Route to get all blogs
router.get('/', getBlogs)

// Route to get a single blog by ID
router.get('/:id', getBlogById)

// Route to create a new blog (authentication required)
router.post('/', protect, createBlog)

// Route to update a blog by ID (authentication and authorization required)
router.put('/:id', protect, updateBlog)

// Route to delete a blog by ID (authentication and authorization required)
router.delete('/:id', protect, deleteBlog)

export default router
