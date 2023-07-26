import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'
import { useApi } from '../composable/useApi'
import { useAlert } from '../composable/useAlert'

export const useCartStore = defineStore('cart', () => {
  const route = useRoute()
  const {
    getAllProduct,
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
      if (route.path === '/cart') {
        adjustCartItem()
      }
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

  const adjustCartItem = async () => {
    const products = await getAllProduct(true)
    const itemToUpdate = []
    const itemToDelete = []

    cartItems.value.forEach((cartItem) => {
      const product = products.find(
        (product) => product.id === cartItem.product.id
      )

      if (!product || product.stock === 0) {
        itemToDelete.push(cartItem.id)
      } else if (product && cartItem.amount > product.stock) {
        itemToUpdate.push({ id: cartItem.id, amount: product.stock })
      }
    })

    if (itemToDelete.length > 0) {
      await Promise.all(itemToDelete.map((id) => deleteCartItem(id)))
    }

    if (itemToUpdate.length > 0) {
      await Promise.all(
        itemToUpdate.map((item) => updateCartItemAmount(item.id, item.amount))
      )
    }

    if (itemToDelete.length > 0 || itemToUpdate.length > 0) {
      showAlert('info', '購物車商品數量變動').then(() => {
        cartItems.value = cartItems.value
          .map((cartItem) => {
            const product = products.find(
              (product) => product.id === cartItem.product.id
            )
            if (!product || product.stock === 0) {
              return null
            } else if (product && cartItem.amount > product.stock) {
              return {
                ...cartItem,
                amount: product.stock,
                product: { ...cartItem.product, stock: product.stock }
              }
            } else {
              return cartItem
            }
          })
          .filter((cartItem) => cartItem !== null)
      })
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
      showAlert('error', error.message).then(async () => adjustCartItem())
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
