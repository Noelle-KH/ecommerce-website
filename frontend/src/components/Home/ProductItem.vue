<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../../stores/auth'
import { useCartStore } from '../../stores/cart'
import { useAlert } from '../../composable/useAlert'
import CartIcon from '../icons/CartIcon.vue'

const props = defineProps(['product'])

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const { isAuthenticate, user } = storeToRefs(authStore)
const { addNewCartItem } = cartStore
const { showAlert } = useAlert()

const formatName = computed(() => {
  return props.product.name.length > 30
    ? `${props.product.name.slice(0, 25)}...`
    : props.product.name
})

const handleShowDetail = (id) => {
  router.push({ name: 'ProductDetail', params: { id } })
}

const handleAddCartItem = async (id) => {
  try {
    if (!isAuthenticate.value) {
      return showAlert('error', '請先註冊或登入才能使用功能')
    }

    const { status, message } = await addNewCartItem(user.value.cartId, id)
    if (status === 'success') {
      showAlert('success', message)
    }
  } catch (error) {
    showAlert('error', error)
  }
}
</script>

<template>
  <img
    class="h-60 w-full object-cover"
    :class="[product.stock !== 0 ? 'cursor-pointer hover:opacity-80' : '']"
    :src="product.image"
    :alt="product.name"
    @click="handleShowDetail(product.id)"
  />
  <div class="p-3">
    <p class="mb-1 font-bold">{{ formatName }}</p>
    <p class="text-lg font-bold text-sky-400">NT$ {{ product.price }}</p>

    <p class="flex items-center justify-end gap-3">
      <CartIcon
        v-show="user?.role !== 'seller' && product.stock !== 0"
        class="h-6 w-6 cursor-pointer text-orange-400 hover:text-orange-500"
        @click="handleAddCartItem(product.id)"
      />
      <span class="text-sm text-stone-500">{{
        product.stock !== 0 ? `還剩 ${product.stock} 件` : '售完'
      }}</span>
    </p>
  </div>
</template>
