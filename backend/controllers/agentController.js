import Agent from '../models/Agent.js'
import asyncHandler from '../middleware/asyncHandler.js'
// Get all agents
export const getAgents = asyncHandler( async (req, res) => {
  try {
    const agents = await Agent.find()
    res.status(200).json(agents)
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error })
  }
})

// Get a single agent by ID
export const getAgentById = asyncHandler( async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id)
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' })
    }
    res.status(200).json(agent)
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error })
  }
})

// Create a new agent
export const createAgent = asyncHandler( async (req, res) => {
  try {
    const newAgent = new Agent(req.body)
    const agent = await newAgent.save()
    res.status(201).json(agent)
  } catch (error) {
    res.status(400).json({ message: 'Error creating agent', error })
  }
})

// Update an agent by ID
export const updateAgent = asyncHandler( async (req, res) => {
  try {
    const updatedAgent = await Agent.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
    if (!updatedAgent) {
      return res.status(404).json({ message: 'Agent not found' })
    }
    res.status(200).json(updatedAgent)
  } catch (error) {
    res.status(400).json({ message: 'Error updating agent', error })
  }
})

// Delete an agent by ID
export const deleteAgent = asyncHandler( async (req, res) => {
  try {
    const deletedAgent = await Agent.findByIdAndDelete(req.params.id)
    if (!deletedAgent) {
      return res.status(404).json({ message: 'Agent not found' })
    }
    res.status(200).json({ message: 'Agent deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error })
  }
})
