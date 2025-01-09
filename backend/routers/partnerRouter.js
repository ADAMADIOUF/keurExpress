import express from 'express'
import {
  createPartner,
  getPartners,
  getPartnerById,
  updatePartner,
  deletePartner,
} from '../controllers/partenairController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// @route   POST /api/partners
// @desc    Create a new partner
// @access  Private (Admin only)
router.post('/', protect, admin, createPartner)

// @route   GET /api/partners
// @desc    Get all partners
// @access  Public
router.get('/', getPartners)

// @route   GET /api/partners/:id
// @desc    Get partner by ID
// @access  Public
router.get('/:id', getPartnerById)

// @route   PUT /api/partners/:id
// @desc    Update a partner
// @access  Private (Admin only)
router.put('/:id', protect, admin, updatePartner)

// @route   DELETE /api/partners/:id
// @desc    Delete a partner
// @access  Private (Admin only)
router.delete('/:id', protect, admin, deletePartner)

export default router
