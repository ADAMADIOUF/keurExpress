import Property from '../models/Property.js'
import asyncHandler from '../middleware/asyncHandler.js'

// Create a new property
// POST /api/properties
export const createProperty = asyncHandler(async (req, res) => {
  console.log(req.body) // Log the incoming body

  const {
    title,
    description,
    price,
    location,
    images,
    status,
    propertyType,
    bedrooms,
    bathrooms,
    size,
    garage,
    store,
  } = req.body

  const properties = new Property({
    title,
    description,
    price,
    location,
    images,
    status,
    propertyType,
    bedrooms,
    bathrooms,
    size,
    garage,
    store,
  })

  const createdProperty = await properties.save()
  res.status(201).json(createdProperty)
})

// Get all properties
// GET /api/properties
export const getProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find() // Fetch all properties

  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties,
  })
})

// Get a single property by ID
// GET /api/properties/:id
export const getSingleProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id)

  if (!property) {
    return res.status(404).json({
      success: false,
      message: 'Property not found',
    })
  }

  res.status(200).json({
    success: true,
    data: property,
  })
})

// Update a property
// PUT /api/properties/:id
export const updateProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id)

  if (!property) {
    return res.status(404).json({
      success: false,
      message: 'Property not found',
    })
  }

  const updatedProperty = await Property.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  )

  res.status(200).json({
    success: true,
    data: updatedProperty,
  })
})

// Delete a property
// DELETE /api/properties/:id
export const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id)

  if (!property) {
    return res.status(404).json({
      success: false,
      message: 'Property not found',
    })
  }

  await Property.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    message: 'Property deleted successfully',
  })
})
