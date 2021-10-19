import express from 'express'
// initialize router
const router = express.Router()

// middlewares
import { requireSignIn } from '../middlewares/index'

// importing Controllers
import { register, login, logout, currentUser } from '../controllers/auth.js'

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/current-user', requireSignIn, currentUser)

module.exports = router
