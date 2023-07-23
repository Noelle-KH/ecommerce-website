const router = require('express').Router()
const { verifyToken, verifyRole } = require('../../middleware/auth')
const { productValidation } = require('../../middleware/validation')
const upload = require('../../middleware/multer')
const productController = require('../../controllers/product-controller')

router.get('/:id', productController.getProduct)
router.get('/', productController.getAllProduct)

router.use(verifyToken, verifyRole('seller'))
router
  .route('/:id')
  .put(
    upload.single('image'),
    productValidation,
    productController.updateProduct
  )
  .patch(productController.updateProductStatus)
  .delete(productController.deleteProduct)

router
  .route('/')
  .post(
    upload.single('image'),
    productValidation,
    productController.postProduct
  )

module.exports = router
