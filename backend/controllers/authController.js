import User from "../models/User.js";

import asyncHandler from "../middleware/asyncHandler.js"
import generateToken from '../utils/generateToken.js'

const generateNumericCode = (length) => {
  let code = ''
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10)
  }
  return code
}

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
    
    generateToken(user._id, res) 
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role, // Include the role in the response
      profileImage: user.profileImage || '/images/default-avatar.png', // Fallback image
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// Google authentication callback (existing)

export const googleAuthCallback = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    console.log(profile)

    if (!profile.id || !profile.emails || !profile.emails[0]?.value) {
      return done(new Error('Invalid Google profile structure'), null)
    }

   
    let user = await User.findOne({
      $or: [{ googleId: profile.id }, { email: profile.emails[0]?.value }],
    })

    if (!user) {
      user = new User({
        googleId: profile.id,
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0]?.value,
        profileImage:
          profile.photos?.[0]?.value || '/images/default-avatar.png',
      })
      await user.save()
    }

   
    const token = generateToken(user._id) 
    done(null, user, { message: 'Google Auth Success', token }) 
  } catch (err) {
    console.error('Google Auth Error:', err)
    done(err, null)
  }
}

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
  const user = await User.findById(req.params.id) // Get user by ID

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      buyer: user.buyer,
      seller: user.seller,
      profileImage: user.profileImage || '/images/default-avatar.png',
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// Update a user (Admin only)
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, isAdmin, buyer, seller } = req.body

  const user = await User.findById(req.params.id) // Find user by ID

  if (user) {
    user.name = name || user.name
    user.email = email || user.email
    user.isAdmin = isAdmin ?? user.isAdmin // Use nullish coalescing for boolean
    user.buyer = buyer ?? user.buyer
    user.seller = seller ?? user.seller

    // Save updated user
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      buyer: updatedUser.buyer,
      seller: updatedUser.seller,
      profileImage: updatedUser.profileImage || '/images/default-avatar.png',
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// Delete a user (Admin only)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id) // Find user by ID

  if (user) {
    await user.remove() // Delete user
    res.json({ message: 'User removed successfully' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'logout successfully' })
})
