const router = require('express').Router()
const cartController = require('../../controllers/cart-controller')

router.post('/:productId', cartController.postCartItem)

router
  .route('/:id')
  .patch(cartController.updateCartItem)
  .delete(cartController.deleteCartItem)

router
  .route('/')
  .get(cartController.getCartItems)
  .patch(cartController.updateCartStatus)

module.exports = router
