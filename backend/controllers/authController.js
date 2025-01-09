import User from '../models/User.js'
import asyncHandler from '../middleware/asyncHandler.js'
import generateToken from '../utils/generateToken.js'
import crypto from 'crypto'
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} from '../mailtrap/mailtrap.js'

// Helper function to generate a numeric code
const generateNumericCode = (length) => {
  let code = ''
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10)
  }
  return code
}

// Register User
export const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password, role } = req.body

  console.log('Role received:', role) // Debugging log

  // Handle missing role and default to 'user'
  const userRole = role === 'admin' ? 'admin' : 'user'
  console.log('Assigned role:', userRole) // Debugging log

  // Check if user already exists
  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error('User already exists')
  }

  const verificationCode = generateNumericCode(6)

  // Create the new user
  const user = await User.create({
    name,
    email,
    password,
    role: userRole, // Ensure the role is being saved correctly
    verificationToken: verificationCode,
    verificationExpiresAt: Date.now() + 3600000, // 1 hour expiry
  })

  if (user) {
    // Generate token and send response
    generateToken(res, user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } else {
    res.status(400)
    throw new Error('User not created')
  }
})

// Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// Get User Profile
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// Update User Profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, image } = req.body
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (name) user.name = name
  if (email) user.email = email
  if (image) user.image = image

  await user.save()

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
  })
})

// Get All Users (Admin only)
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}) // Fetch all users
  res.json(users) // Send the users as a response
})

// Get a User by ID (Admin only)
export const getUserById = asyncHandler(async (req, res) => {
  // Check if user has admin role
  if (!isAdmin(req)) {
    res.status(403)
    throw new Error('Access denied. Admins only.')
  }

  const user = await User.findById(req.params.id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.role === 'admin',
      image: user.image,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// Update User (Admin only)
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, role ,image} = req.body

  // Get user from DB
  const user = await User.findById(req.params.id)

  if (user) {
    // Check if trying to update an admin user
    if (user.role === 'admin' && req.user.role !== 'admin') {
      res.status(400)
      throw new Error('Cannot update admin user')
    }

    // If the role is provided, ensure that an admin cannot be assigned a non-admin role
    if (role && user.role === 'admin' && role !== 'admin') {
      res.status(400)
      throw new Error('Cannot change admin role')
    }

    // Update user fields
    user.name = name || user.name
    user.email = email || user.email
    user.role = role || user.role
    user.image = image || user.image
    const updatedUser = await user.save()

    // Send the updated user back in the response
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      image: updatedUser.image,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
// Delete User (Admin only)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    // Check if the user is an admin, if so, prevent deletion
    if (user.role === 'admin') {
      res.status(400)
      throw new Error('Cannot delete an admin user')
    }

    // Delete the user
    await User.deleteOne({ _id: user._id })
    res.status(200).json({ message: 'User deleted successfully' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// Forgot Password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  // Find the user by email
  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Set reset password token and expiry time (1 hour from now)
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  user.resetPasswordExpiresAt = Date.now() + 3600000 // 1 hour

  await user.save()

  // Create reset password link
  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`

  try {
    // Send password reset email
    await sendPasswordResetEmail(user.email, resetUrl)

    res.status(200).json({ message: 'Reset link sent to your email' })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpiresAt = undefined
    await user.save()

    res
      .status(500)
      .json({ message: 'Email could not be sent', error: error.message })
  }
})

// Reset Password
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  // Hash the token to match the stored token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex')

  // Find user by token and check if token has not expired
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpiresAt: { $gt: Date.now() }, // Token is still valid
  })

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired reset token' })
  }

  // Set the new password
  user.password = password
  user.resetPasswordToken = undefined
  user.resetPasswordExpiresAt = undefined

  await user.save()

  // Send password reset success email
  await sendResetSuccessEmail(user.email)

  res
    .status(200)
    .json({ message: 'Password reset successful, you can now log in' })
})

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'Logged out successfully' })
})

// Helper function to check if user is admin
const isAdmin = (req) => {
  return req.user && req.user.role === 'admin'
}
