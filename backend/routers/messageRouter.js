import express from 'express'
import { sendMessage } from '../controllers/messageController.js'
const router = express.Router()

// Route: Send a message via email
router.post('/properties/:id/contact', sendMessage)

export default router
