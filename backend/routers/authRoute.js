import express from 'express'
import passport from 'passport'
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  logoutUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/authController.js'

import { protect, admin } from '../middleware/authMiddleware.js'
import generateToken from '../utils/generateToken.js'
const router = express.Router()
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
)

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    // Generate the token for the logged-in user
    const token = generateToken(req.user._id, res) // Pass the response object

    // Optionally log the token or send it in the response body (for API use)
    // console.log(token); // Token could also be sent in response if not using cookies

    // Redirect to profile page or send the response to the client
    res.redirect('http://localhost:3000/profile')
  }
)
router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.route('/profile').get(protect, getProfile).put(protect, updateProfile)
router
  .route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser)

export default router
