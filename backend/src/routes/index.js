const router = require('express').Router()

const authController = require('../controllers/auth-controller')
const { loginValidation } = require('../middleware/validation')

router.post('/login', loginValidation, authController.login)

module.exports = router
