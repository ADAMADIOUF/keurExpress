import express from 'express'
import { sendMessage } from '../controllers/messageController.js'

const router = express.Router()

// Route for sending messages
router.post('/properties/:id/contact', sendMessage)

export default router
