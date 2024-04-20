import express from 'express'
import { checkHealth } from '../controllers/healthController.js'

const healthRouter = express.Router()

// always return 200 OK
healthRouter.get('/', checkHealth)

export { healthRouter }
