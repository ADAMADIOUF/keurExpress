import asyncHandler from '../middleware/asyncHandler.js'
import Partner from '../models/Partenair.js'

// @desc    Create a new partner
// @route   POST /api/partners
// @access  Private
const createPartner = asyncHandler(async (req, res) => {
  console.log(req.body) // Log the incoming body

  const {
    name,
    address,
    profession,
    contactNumber,
    contactEmail,
    description,
    socialMedia,
    website,
    about,
    image,
  } = req.body

  // Check if a partner with the same email already exists
  const partnerExists = await Partner.findOne({ contactEmail })
  if (partnerExists) {
    return res
      .status(400)
      .json({ message: 'Partner with this email already exists.' })
  }

  // Create a new partner instance
  const partner = new Partner({
    name,
    address,
    profession,
    contactNumber,
    contactEmail,
    description,
    socialMedia,
    website,
    about,
    image,
    user: req.user._id, // assuming `req.user._id` stores the authenticated user ID
  })

  try {
    // Save the new partner to the database
    const createdPartner = await partner.save()
    res.status(201).json(createdPartner)
  } catch (error) {
    console.error('Error creating partner:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @desc    Get all partners
// @route   GET /api/partners
// @access  Public
const getPartners = asyncHandler(async (req, res) => {
  const partners = await Partner.find()
  res.json(partners)
})

// @desc    Get partner by ID
// @route   GET /api/partners/:id
// @access  Public
const getPartnerById = asyncHandler(async (req, res) => {
  const partner = await Partner.findById(req.params.id)

  if (partner) {
    res.json(partner)
  } else {
    res.status(404)
    throw new Error('Partner not found')
  }
})

// @desc    Update partner
// @route   PUT /api/partners/:id
// @access  Private
const updatePartner = asyncHandler(async (req, res) => {
  const partner = await Partner.findById(req.params.id)

  if (partner) {
    partner.name = req.body.name || partner.name
    partner.contactNumber = req.body.contactNumber || partner.contactNumber
    partner.contactEmail = req.body.contactEmail || partner.contactEmail
    partner.address = req.body.address || partner.address
    partner.profession = req.body.profession || partner.profession
    partner.description = req.body.description || partner.description
    partner.website = req.body.website || partner.website
    partner.socialMedia = req.body.socialMedia || partner.socialMedia
    partner.about = req.body.about || partner.about
    partner.image = req.body.image || partner.image

    const updatedPartner = await partner.save()
    res.json(updatedPartner)
  } else {
    res.status(404)
    throw new Error('Partner not found')
  }
})

// @desc    Delete partner
// @route   DELETE /api/partners/:id
// @access  Private
const deletePartner = asyncHandler(async (req, res) => {
  try {
    const deletedPartener = await Partner.findByIdAndDelete(req.params.id)
    if (!deletedPartener) {
      return res.status(404).json({ message: 'Agent not found' })
    }
    res.status(200).json({ message: 'Agent deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error })
  }
})

export {
  createPartner,
  getPartners,
  getPartnerById,
  updatePartner,
  deletePartner,
}
