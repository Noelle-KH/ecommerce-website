<script setup>
import Swal from 'sweetalert2'
import { defineAsyncComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'
import { useStoreStore } from '../stores/store'

const AddItemModal = defineAsyncComponent(() =>
  import('../components/Store/AddItemModal.vue')
)
const StoreList = defineAsyncComponent(() =>
  import('../components/Store/StoreList.vue')
)

const router = useRouter()
const authStore = useAuthStore()
const storeStore = useStoreStore()
const { isAuthenticate, user } = storeToRefs(authStore)
const { showAddItemModal } = storeToRefs(storeStore)

onMounted(async () => {
  if (!isAuthenticate.value || user.value?.role !== 'seller') {
    Swal.fire({
      icon: 'error',
      title: !isAuthenticate.value
        ? '請先註冊或登入才能使用功能'
        : '沒有使用該頁面的權限'
    })
    return router.replace({ name: 'HomeView' })
  }
})
</script>

<template>
  <main v-if="isAuthenticate && user.role === 'seller'" class="px-10 py-12">
    <AddItemModal v-if="showAddItemModal" />
    <StoreList :active="true" />
    <StoreList :active="false" />
  </main>
</template>
