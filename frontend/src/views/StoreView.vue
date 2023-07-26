<script setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'
import { useStoreStore } from '../stores/store'
import { useAlert } from '../composable/useAlert'

const ItemModal = defineAsyncComponent(() =>
  import('../components/Store/ItemModal.vue')
)
const StoreList = defineAsyncComponent(() =>
  import('../components/Store/StoreList.vue')
)

const router = useRouter()
const authStore = useAuthStore()
const storeStore = useStoreStore()
const { isAuthenticate, user } = storeToRefs(authStore)
const { showItemModal } = storeToRefs(storeStore)
const { showAlert } = useAlert()

onMounted(() => {
  if (!isAuthenticate.value || user.value?.role !== 'seller') {
    const title = !isAuthenticate.value
      ? '請先註冊或登入才能使用功能'
      : '沒有使用該頁面的權限'

    showAlert('error', title)

    return router.replace({ name: 'ProductList' })
  }
})
</script>

<template>
  <main v-if="isAuthenticate && user.role === 'seller'" class="px-10 py-12">
    <ItemModal v-if="showItemModal" />
    <StoreList :active="true" />
    <StoreList :active="false" />
  </main>
</template>
