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
    livingrooms,
    bedrooms,
    bathrooms,
    size,
    garage,
    store,
    isFeatured,
    userProfile,
  } = req.body

  const property = new Property({
    title,
    description,
    price,
    location,
    images,
    status,
    propertyType,
    livingrooms,
    bedrooms,
    bathrooms,
    size,
    garage,
    store,
    isFeatured,
    userProfile,
    user: req.user._id,
  })

  const createdProperty = await property.save()
  res.status(201).json(createdProperty)
})

// Get all properties
// GET /api/properties
export const getProperties = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? { title: { $regex: req.query.keyword, $options: 'i' } }
    : {}

  const filters = {
    ...keyword,
    ...(req.query.propertyType && { propertyType: req.query.propertyType }),
    ...(req.query.minPrice && { price: { $gte: req.query.minPrice } }),
    ...(req.query.maxPrice && { price: { $lte: req.query.maxPrice } }),
    ...(req.query.location && {
      'location.city': { $regex: req.query.location, $options: 'i' },
    }),
    ...(req.query.address && {
      'location.address': { $regex: req.query.address, $options: 'i' },
    }),
  }

  const properties = await Property.find(filters)
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
    res.status(404).json({ success: false, message: 'Property not found' })
    return
  }

  res.status(200).json({ success: true, data: property })
})

// Update a property
// PUT /api/properties/:id
export const updateProperty = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      images,
      status,
      propertyType,
      livingrooms,
      bedrooms,
      bathrooms,
      size,
      location,
      garage,
      store,
      isFeatured,
      userProfile,
    } = req.body

    // Find the property by its ID
    const property = await Property.findById(req.params.id)

    if (!property) {
      res.status(404).json({ success: false, message: 'Property not found' })
      return
    }

    // Update the property fields
    property.title = title || property.title
    property.description = description || property.description
    property.price = price || property.price
    property.images = images || property.images
    property.status = status || property.status
    property.propertyType = propertyType || property.propertyType
    property.livingrooms = livingrooms || property.livingrooms
    property.bedrooms = bedrooms || property.bedrooms
    property.bathrooms = bathrooms || property.bathrooms
    property.size = size || property.size
    property.location = location || property.location
    property.garage = garage || property.garage
    property.store = store || property.store
    property.isFeatured = isFeatured || property.isFeatured
    property.userProfile = userProfile || property.userProfile

    // Save the updated property
    const updatedProperty = await property.save()

    // Respond with the updated property
    res.status(200).json({
      success: true,
      message: 'Property updated successfully',
      data: updatedProperty,
    })
  } catch (error) {
    console.error(`Error updating property: ${error.message}`)
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    })
  }
})
// Delete a property
// DELETE /api/properties/:id
export const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id)

  if (!property) {
    res.status(404).json({ success: false, message: 'Property not found' })
    return
  }

  await Property.findByIdAndDelete(req.params.id)
  res
    .status(200)
    .json({ success: true, message: 'Property deleted successfully' })
})
