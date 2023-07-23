import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '../composable/useApi'
import { useAlert } from '../composable/useAlert'

export const useCartStore = defineStore('cart', () => {
  const {
    getAllCartItem,
    addCartItem,
    updateCartItemAmount,
    deleteCartItem,
    updateCartStatus
  } = useApi()
  const { showAlert } = useAlert()
  const cartItems = ref([])
  const isLoading = ref(false)
  const errorMessage = ref(null)
  let timer

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
      isLoading.value = true
      cartItems.value = await getAllCartItem()
    } catch (error) {
      throw error.message
    } finally {
      isLoading.value = false
    }
  }

  const addNewCartItem = async (cartId, productId) => {
    try {
      const { status, message, data } = await addCartItem(cartId, productId)

      if (status === 'success') {
        const cartItem = cartItems.value.find(
          (cartItem) => cartItem.product.id === productId
        )
        if (cartItem) {
          cartItem.amount = cartItem.amount + 1
        } else {
          cartItems.value = [{ ...data.cartItem }, ...cartItems.value]
        }

        return { status, message }
      }
    } catch (error) {
      throw error.message
    }
  }

  const updateAmount = (id, type) => {
    try {
      clearTimeout(timer)

      const cartItem = cartItems.value.find((item) => item.id === id)

      if (type === '-') {
        if (cartItem.amount < 2) {
          return showAlert('warning', '數量不能小於1')
        }
        cartItem.amount = cartItem.amount - 1
      } else {
        if (cartItem.amount > cartItem.product.stock - 1) {
          return showAlert('warning', '已達該商品最大庫存量')
        }
        cartItem.amount = cartItem.amount + 1
      }

      timer = setTimeout(async () => {
        await updateCartItemAmount(cartItem.id, cartItem.amount)
      }, 500)
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
      showAlert('error', error.message).then(async () => {
        const adjustCartItemAmount = cartItems.value
          .filter((cartItem) => cartItem.amount > cartItem.product.stock)
          .map((cartItem) => ({
            id: cartItem.id,
            amount: cartItem.product.stock
          }))

        await Promise.all(
          adjustCartItemAmount.map((cartItem) =>
            updateCartItemAmount(cartItem.id, cartItem.amount)
          )
        )

        cartItems.value = cartItems.value.map((cartItem) =>
          cartItem.amount > cartItem.product.stock
            ? { ...cartItem, amount: cartItem.product.stock }
            : cartItem
        )
      })
    }
  }

  return {
    cartItems,
    isLoading,
    errorMessage,
    totalAmount,
    cartItemsAmount,
    getCartItems,
    addNewCartItem,
    updateAmount,
    setAmount,
    removeCartItem,
    checkout
  }
})
