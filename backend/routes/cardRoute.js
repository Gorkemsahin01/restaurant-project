import express from 'express'
import { addTocard, removeFromcard, getcard } from '../controllers/cardController.js'
import authMiddleware from '../middleware/auth.js'

const cardRouter = express.Router()

cardRouter.post('/add', authMiddleware, addTocard)
cardRouter.post('/remove', authMiddleware, removeFromcard)
cardRouter.post('/get', authMiddleware, getcard)

export default cardRouter
