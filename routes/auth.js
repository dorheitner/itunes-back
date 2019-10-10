const express = require('express')

const authController = require('../controllers/auth')
const authValidator = require('../validators/auth')

const router = express.Router()

router.post('/signup', authValidator.signUp, authController.signUp)
router.post('/login', authValidator.login, authController.login)
// router.post(
//   '/reset-password',
//   authValidator.login,
//   authController.resetPassword
// )
router.get('/logout', authController.logout)

module.exports = router
