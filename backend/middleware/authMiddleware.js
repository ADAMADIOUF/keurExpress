import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/User.js' 
const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }
  
  else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt
  }

 
  if (!token) {
    console.error('Authorization error: No token provided.')
    res.status(401).json({ message: 'Not authorized, no token' })
    return 
  }

  try {
    
    const decoded = jwt.verify(token, process.env.KEUR_EXPRESS)

    
    req.user = await User.findById(decoded.userId).select('-password')
    if (!req.user) {
      console.error('Authorization error: User not found in database.')
      res.status(401).json({ message: 'Not authorized, user not found' })
      return
    }

    
    next()
  } catch (error) {
    console.error(`Authorization error: ${error.message}`)
    res.status(401).json({ message: 'Not authorized, token failed' })
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
     console.log(`User with ID: ${req.user._id} is admin`)
    next()
  } else {
      console.log(`User with ID: ${req.user._id} is not admin`)
    res.status(401)
    throw new Error('Not authorized as Admin')
  }
}

export { admin, protect }
