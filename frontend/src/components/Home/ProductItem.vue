<script setup>
import Swal from 'sweetalert2'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../../stores/auth'
import { useCartStore } from '../../stores/cart'
import CartIcon from '../icons/CartIcon.vue'

const authStore = useAuthStore()
const cartStore = useCartStore()
const { isAuthenticate, user } = storeToRefs(authStore)
const { addNewCartItem } = cartStore

const props = defineProps(['product'])

const formatName = computed(() => {
  return props.product.name.length > 30
    ? `${props.product.name.slice(0, 25)}...`
    : props.product.name
})

const handleAddCartItem = async (id) => {
  try {
    if (!isAuthenticate.value) {
      return Swal.fire({
        icon: 'error',
        title: '請先註冊或登入才能使用功能'
      })
    }
    const { status, message } = await addNewCartItem(id)
    if (status === 'success') {
      Swal.fire({
        icon: 'success',
        title: message
      })
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: error
    })
  }
}
</script>

<template>
  <div
    class="rounded-sm shadow-md"
    :class="[product.stock === 0 ? 'opacity-40' : '']"
  >
    <img
      class="object-cover"
      :class="[product.stock !== 0 ? 'cursor-pointer hover:opacity-80' : '']"
      :src="product.image"
      :alt="product.name"
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
  </div>
</template>
