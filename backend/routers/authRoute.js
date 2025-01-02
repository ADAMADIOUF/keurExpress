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
  resetPassword,
  forgotPassword,
} from '../controllers/authController.js'

import { protect, admin } from '../middleware/authMiddleware.js'
import generateTokenGoogle from '../utils/generateTokenGoogle.js'

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
   
    const token = generateTokenGoogle(req.user._id, res) 
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
router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:token', resetPassword)
export default router
