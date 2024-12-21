import express from 'express'
import {
  createBlog,
  getBlogs,
  getBlogById,
} from '../controllers/blogControoler.js'
import { protect } from '../middleware/authMiddleware.js' // Assuming protect middleware for authentication

const router = express.Router()

// Route to get all blogs
router.get('/', getBlogs)

// Route to get a single blog by ID
router.get('/:id', getBlogById)

// Route to create a new blog (authentication required)
router.post('/',protect, createBlog)

export default router
