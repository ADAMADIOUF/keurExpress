import express from 'express'
import multer from 'multer'
import {
  createProperty,
  getProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertieController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import storage from '../utils/fileUpload.js'

const router = express.Router()

// Routes
const upload = multer({ storage })
router.post('/', protect, admin, createProperty) // Create a property
router.get('/', getProperties) // Get all properties
router.get('/:id', getSingleProperty) // Get a single property by ID
router.put(
  '/:id',
  protect,
  admin,
  updateProperty
) // Update a property by ID
router.delete('/:id', protect, admin, deleteProperty) // Delete a property by ID

export default router
