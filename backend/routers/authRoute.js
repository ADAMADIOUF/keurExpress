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


const router = express.Router()

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
