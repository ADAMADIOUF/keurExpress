import Message from '../models/Message.js'
import Property from '../models/Property.js'
import asyncHandler from '../middleware/asyncHandler.js'

// Controller: Send a message
export const sendMessage = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { senderName, senderEmail, senderPhone, message } = req.body

  // Find the property
  const property = await Property.findById(id).populate('user')
  if (!property) {
    res.status(404)
    throw new Error('Property not found')
  }

  // Create a new message
  const newMessage = await Message.create({
    property: id,
    senderName,
    senderEmail,
    senderPhone,
    message,
  })

  res
    .status(201)
    .json({ message: 'Message sent successfully', data: newMessage })
})
