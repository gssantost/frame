import express from 'express'
import { Auth as AuthController } from '../controllers'

let router = express.Router()

router.get('/me', AuthController.get)
router.get('/profile', AuthController.getUser)
router.post('/login', AuthController.post)

export default router