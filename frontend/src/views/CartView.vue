<script setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'
import { useAlert } from '../composable/useAlert'

const CartList = defineAsyncComponent(() =>
  import('../components/Cart/CartList.vue')
)

const router = useRouter()
const authStore = useAuthStore()
const { isAuthenticate, user } = storeToRefs(authStore)
const { showAlert } = useAlert()

onMounted(() => {
  if (!isAuthenticate.value || user.value?.role !== 'buyer') {
    const title = !isAuthenticate.value
      ? '請先註冊或登入才能使用功能'
      : '沒有使用該頁面的權限'

    showAlert('error', title)

    return router.go(-1)
  }
})
</script>

<template>
  <main v-if="isAuthenticate && user.role === 'buyer'" class="px-10 py-12">
    <CartList />
  </main>
</template>
