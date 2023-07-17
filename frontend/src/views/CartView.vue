<script setup>
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CartList from '../components/Cart/CartList.vue'
import LoadAnimation from '../components/LoadAnimation.vue'
import useApi from '../composable/useApi'

const props = defineProps(['isAuthenticate', 'role'])
const router = useRouter()
const { getCartItems } = useApi()

const cartItems = ref([])
const isLoading = ref(false)
const errorMessage = ref(null)

onMounted(async () => {
  try {
    if (!props.isAuthenticate || props.role !== 'buyer') {
      Swal.fire({
        icon: 'error',
        title: '沒有使用該頁面的權限'
      })
      return router.replace({ name: 'HomeView' })
    }
    isLoading.value = true
    const cartItemsData = await getCartItems()
    cartItems.value = cartItemsData.cart.cartItem
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main class="px-10 py-12">
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <LoadAnimation v-if="isLoading && !errorMessage" />
    <CartList v-if="cartItems" :cartItems="cartItems" />
  </main>
</template>
