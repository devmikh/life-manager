import express from 'express'
import authRoutes from './auth'

const router = express.Router()

router.use('/api', authRoutes)

export default router