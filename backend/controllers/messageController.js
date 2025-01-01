import nodemailer from 'nodemailer'
import Property from '../models/Property.js'
import asyncHandler from '../middleware/asyncHandler.js'

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email provider
  auth: {
    user: process.env.EMAIL_EMAIL, // Your email address
    pass: process.env.EMAIL_PASSPORT, // Your email password or app password
  },
})

// Controller: Send a message
export const sendMessage = asyncHandler(async (req, res) => {
  const { id } = req.params // Property ID
  const { senderName, senderEmail, senderPhone, message } = req.body

  // Find the property and its associated user profile
  const property = await Property.findById(id)
  if (!property) {
    res.status(404)
    throw new Error('Property not found')
  }

  // Get the userProfile email (the email of the property owner)
  const userProfileEmail = property.userProfile.email
  if (!userProfileEmail) {
    res.status(400)
    throw new Error('User profile email not found')
  }

  // Create the email content
  const mailOptions = {
    from: process.env.EMAIL_EMAIL, // Sender address
    to: userProfileEmail, // Recipient (user profile email)
    subject: `New Inquiry for Your Property: ${property.title}`,
    html: `
      <h3>New Inquiry for ${property.title}</h3>
      <p><strong>Name:</strong> ${senderName}</p>
      <p><strong>Email:</strong> ${senderEmail}</p>
      <p><strong>Phone:</strong> ${senderPhone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  }

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500)
      throw new Error('Failed to send email. Please try again later.')
    }
    res.status(200).json({ message: 'Message sent successfully via email!' })
  })
})
