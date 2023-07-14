const router = require('express').Router()

const authController = require('../controllers/auth-controller')
const { loginValidation } = require('../middleware/validation')
const products = require('./modules/products-route')

router.post('/login', loginValidation, authController.login)

router.use('/products', products)

module.exports = router
