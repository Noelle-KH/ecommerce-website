import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '../composable/useApi'
import { useFormValidation } from '../composable/useFormValidation'

export const useAuthStore = defineStore('auth', () => {
  const { login, register } = useApi()
  const isAuthenticate = ref(localStorage.getItem('token') !== null)
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const showAuthModal = ref(false)
  const modalType = ref('登入')
  const loginType = ref('會員')
  const formData = ref({
    account: '',
    password: '',
    confirmPassword: ''
  })
  const formError = ref({
    account: null,
    password: null,
    confirmPassword: null
  })
  const errorMessage = ref(null)
  const { resetForm } = useFormValidation(formData, formError, errorMessage)

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
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  const toggleModal = () => {
    showAuthModal.value = !showAuthModal.value
  }

  const changeTitle = () => {
    loginType.value === '會員'
      ? (loginType.value = '商家')
      : (loginType.value = '會員')

    resetForm()
  }

  const changeModalType = () => {
    modalType.value === '登入'
      ? (modalType.value = '註冊')
      : (modalType.value = '登入')
    loginType.value = '會員'

    resetForm()
  }

  const registerOrLogin = async () => {
    try {
      if (modalType.value === '登入') {
        const role = loginType.value === '會員' ? 'buyer' : 'seller'
        const { user, token, message } = await login(role, formData.value)

        return { user, token, message }
      } else {
        const { message } = await register(formData.value)

        return { message }
      }
    } catch (error) {
      throw { code: error.code, message: error.message }
    }
  }

  return {
    isAuthenticate,
    user,
    loginType,
    formData,
    formError,
    modalType,
    showAuthModal,
    changeAuthenticateStatus,
    updateUserCart,
    toggleModal,
    changeTitle,
    changeModalType,
    registerOrLogin
  }
})
