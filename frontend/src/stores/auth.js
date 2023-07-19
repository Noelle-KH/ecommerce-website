import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticate = ref(localStorage.getItem('token') !== null)
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const showLoginModal = ref(false)

  const changeAuthenticateStatus = (status) => {
    isAuthenticate.value = status
    if (status) {
      user.value = JSON.parse(localStorage.getItem('user'))
    } else {
      user.value = null
    }
  }

  const updateUserCart = (cartId) => {
    user.value.cartId = cartId
  }

  const toggleModal = () => {
    showLoginModal.value = !showLoginModal.value
  }

  return {
    isAuthenticate,
    user,
    showLoginModal,
    changeAuthenticateStatus,
    updateUserCart,
    toggleModal
  }
})
