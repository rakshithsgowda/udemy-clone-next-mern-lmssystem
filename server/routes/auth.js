import express from 'express'
// initialize router
const router = express.Router()

// importing Controllers
import { register, login } from '../controllers/auth.js'

router.post('/register', register)
router.post('/login', login)

module.exports = router
