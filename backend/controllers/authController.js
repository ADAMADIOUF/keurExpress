import User from "../models/User.js";

import asyncHandler from "../middleware/asyncHandler.js"
import generateToken from '../utils/generateToken.js'
import crypto from 'crypto'
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} from '../mailtrap/mailtrap.js'
const generateNumericCode = (length) => {
  let code = ''
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10)
  }
  return code
}

const isAdmin = (req) => req.user && req.user.role === 'admin'

export const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password, role } = req.body;

  console.log("Role received:", role); // Debugging log

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const userRole = role === "admin" ? "admin" : "user";
  console.log("Assigned role:", userRole); // Debugging log

  const verificationCode = generateNumericCode(6);

  const user = await User.create({
    name,
    email,
    password,
    role: userRole, // Ensure this is correctly set
    verificationToken: verificationCode,
    verificationExpiresAt: Date.now() + 3600000,
  });

  if (user) {
    generateToken(res, user._id, );

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage || "/images/default-avatar.png",
    });
  } else {
    res.status(400);
    throw new Error("User not created");
  }
});

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
      profileImage: user.profileImage || '/images/default-avatar.png', 
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})



export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id) 

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,

      profileImage: user.profileImage || '/images/default-avatar.png',
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
// Update user profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, profileImage } = req.body

  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  if (name) user.name = name
  if (email) user.email = email
  if (profileImage) user.profileImage = profileImage

  await user.save()

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,

    profileImage: user.profileImage || '/images/default-avatar.png',
  })
})
// Get all users (Admin only)
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}) // Fetch all users
  res.json(users) // Send the users as a response
})

// Get a user by ID (Admin only)
export const getUserById = asyncHandler(async (req, res) => {
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
      buyer: user.role === 'buyer',
      seller: user.role === 'seller',
      profileImage: user.profileImage,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// Update a user (Admin only)
export const updateUser = asyncHandler(async (req, res) => {
  if (!isAdmin(req)) {
    res.status(403)
    throw new Error('Access denied. Admins only.')
  }

  const { name, email, role } = req.body

  const user = await User.findById(req.params.id)

  if (user) {
    user.name = name || user.name
    user.email = email || user.email
    user.role = role || user.role

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      profileImage: updatedUser.profileImage,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// Delete a user (Admin only)
export const deleteUser = asyncHandler(async (req, res) => {
  if (!isAdmin(req)) {
    res.status(403)
    throw new Error('Access denied. Admins only.')
  }

  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed successfully' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
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
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'logout successfully' })
})

