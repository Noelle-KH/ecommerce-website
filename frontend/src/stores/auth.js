import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticate = ref(localStorage.getItem('token') !== null)
  const role = ref(JSON.parse(localStorage.getItem('user'))?.role)

  const changeAuthenticateStatus = (status) => {
    isAuthenticate.value = status
    if (status) {
      role.value = JSON.parse(localStorage.getItem('user')).role
    } else {
      role.value = null
    }
  }

  return { isAuthenticate, role, changeAuthenticateStatus }
})
