import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import useApi from '../composable/useApi'

export const useCartStore = defineStore('cart', () => {
  const {
    getAllCartItem,
    updateCartItemAmount,
    deleteCartItem,
    updateCartStatus
  } = useApi()
  const cartItems = ref([])
  const errorMessage = ref(null)

  const totalAmount = computed(() => {
    return cartItems.value.length
      ? cartItems.value.reduce((acc, item) => {
          return (acc += item.amount * item.product.price)
        }, 0)
      : 0
  })

  const cartItemsAmount = computed(() => {
    return cartItems.value.length
      ? cartItems.value.reduce((acc, item) => {
          return (acc += item.amount)
        }, 0)
      : 0
  })

  const getCartItems = async () => {
    try {
      cartItems.value = await getAllCartItem()
    } catch (error) {
      errorMessage.value = error.message
    }
  }

  const updateAmount = async (id, type) => {
    try {
      const cartItem = cartItems.value.find((item) => item.id === id)

      if (type === '-') {
        if (cartItem.amount < 2) {
          return
        }
        cartItem.amount = cartItem.amount - 1
      } else {
        if (cartItem.amount > cartItem.product.stock - 1) {
          return
        }
        cartItem.amount = cartItem.amount + 1
      }

      await updateCartItemAmount(cartItem.id, cartItem.amount)
    } catch (error) {
      errorMessage.value = error.message
    }
  }

  const setAmount = async (id, value) => {
    try {
      const cartItem = cartItems.value.find((item) => item.id === id)

      if (value < 1 || isNaN(value)) {
        cartItem.amount = 1
      } else if (value > cartItem.product.stock) {
        cartItem.amount = cartItem.product.stock
      } else {
        cartItem.amount = value
      }

      await updateCartItemAmount(cartItem.id, cartItem.amount)
    } catch (error) {
      errorMessage.value = error.message
    }
  }

  const removeCartItem = async (id) => {
    try {
      const { status } = await deleteCartItem(id)
      if (status === 'success') {
        cartItems.value = cartItems.value.filter(
          (cartItem) => cartItem.id !== id
        )
      }
    } catch (error) {
      errorMessage.value = error.message
    }
  }

  const checkout = async () => {
    try {
      const { status, data } = await updateCartStatus()
      if (status === 'success') {
        cartItems.value = []
        return data.cartId
      }
    } catch (error) {
      errorMessage.value = error.message
    }
  }

  return {
    cartItems,
    totalAmount,
    cartItemsAmount,
    getCartItems,
    updateAmount,
    setAmount,
    removeCartItem,
    checkout
  }
})
