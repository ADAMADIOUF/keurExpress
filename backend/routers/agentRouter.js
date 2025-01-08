import express from 'express'
import {
  getAgents,
  getAgentById,
  createAgent,
  updateAgent,
  deleteAgent,
  createAgents,
} from '../controllers/agentController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

// Get all agents
router.post('/create-agents',protect,admin, createAgents)
router.get('/', getAgents)

// Get a single agent by ID
router.get('/:id', getAgentById)

// Create a new agent
router.post('/', createAgent)

// Update an agent by ID
router.put('/:id', protect, admin, updateAgent)

// Delete an agent by ID
router.delete('/:id',protect, admin, deleteAgent)

export default router
