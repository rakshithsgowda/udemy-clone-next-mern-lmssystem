import express from 'express'
// initialize router
const router = express.Router()

// importing Controllers
import { register } from '../controllers/auth.js'

router.post('/register', register)

module.exports = router
