import express from 'express'
// initialize router
const router = express.Router()

// importing Controllers
import { register, login, logout } from '../controllers/auth.js'

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

module.exports = router
