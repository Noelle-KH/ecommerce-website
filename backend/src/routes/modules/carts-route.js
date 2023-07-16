const router = require('express').Router()
const cartController = require('../../controllers/cart-controller')

router
  .route('/:cartItemId')
  .patch(cartController.updateCartItem)
  .delete(cartController.deleteCartItem)

router
  .route('/')
  .get(cartController.getCartItems)
  .post(cartController.postCartItem)
  .patch(cartController.updateCartStatus)

module.exports = router
