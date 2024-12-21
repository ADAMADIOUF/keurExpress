import express from 'express'
import {
  getAgents,
  getAgentById,
  createAgent,
  updateAgent,
  deleteAgent,
} from '../controllers/agentController.js'

const router = express.Router()

// Get all agents
router.get('/', getAgents)

// Get a single agent by ID
router.get('/:id', getAgentById)

// Create a new agent
router.post('/', createAgent)

// Update an agent by ID
router.put('/:id', updateAgent)

// Delete an agent by ID
router.delete('/:id', deleteAgent)

export default router
