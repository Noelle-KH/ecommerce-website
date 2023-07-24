const router = require('express').Router()

const authController = require('../controllers/auth-controller')
const categoryController = require('../controllers/category-controller')
const { authValidation } = require('../middleware/validation')
const { verifyToken, verifyRole } = require('../middleware/auth')
const products = require('./modules/products-route')
const carts = require('./modules/carts-route')

router.post('/login', authValidation('login'), authController.login)

router.post('/register', authValidation('register'), authController.register)

router.get('/categories', categoryController.getCategories)

router.use('/products', products)
router.use('/carts', verifyToken, verifyRole('buyer'), carts)

module.exports = router
