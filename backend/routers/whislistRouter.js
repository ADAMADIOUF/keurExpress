import express from 'express'
import Wishlist from '../models/Whislist.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// @desc    Add property to wishlist
// @route   POST /api/wishlist
// @access  Private
router.post('/', protect, async (req, res) => {
  const { propertieId } = req.body

  // Find the wishlist by user
  const wishlist = await Wishlist.findOne({ user: req.user._id })
  if (wishlist) {
    // Check if the property is already in the wishlist
    if (!wishlist.properties.includes(propertieId)) {
      wishlist.properties.push(propertieId)
      await wishlist.save()
    }
    return res.status(200).json(wishlist)
  } else {
    const newWishlist = await Wishlist.create({
      user: req.user._id,
      properties: [propertieId],
    })
    return res.status(201).json(newWishlist)
  }
})

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
router.get('/', protect, async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
    'properties' // Populate the properties if needed
  )

  if (!wishlist) {
    return res.status(404).json({ message: 'Wishlist not found' })
  }

  res.json(wishlist)
})

// @desc    Remove property from wishlist
// @route   DELETE /api/wishlist/:propertieId
// @access  Private
router.delete('/:propertieId', protect, async (req, res) => {
  const { propertieId } = req.params

  try {
    // Find the wishlist by the current user's ID
    const wishlist = await Wishlist.findOne({ user: req.user._id })

    if (wishlist) {
      // Filter out the property from the properties array based on its _id field
      wishlist.properties = wishlist.properties.filter(
        (item) => item && item._id && item._id.toString() !== propertieId
      )

      // Save the updated wishlist
      await wishlist.save()

      return res.status(200).json(wishlist)
    } else {
      return res.status(404).json({ message: 'Wishlist not found' })
    }
  } catch (error) {
    console.error('Error removing property from wishlist:', error)
    return res.status(500).json({ message: 'Server error' })
  }
})
router.get('/check/:propertieId', protect, async (req, res) => {
  const { propertieId } = req.params
  const userId = req.user._id

  try {
    const wishlist = await Wishlist.findOne({ user: userId })
    if (wishlist) {
      const isInWishlist = wishlist.properties.includes(propertieId)
      return res.json({ isInWishlist })
    } else {
      return res.json({ isInWishlist: false })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})


export default router
