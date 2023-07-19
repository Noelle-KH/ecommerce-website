<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../../stores/auth'
import { useCartStore } from '../../stores/cart'
import CartIcon from '../icons/CartIcon.vue'
import CartItem from './CartItem.vue'
import { onMounted } from 'vue'
import Swal from 'sweetalert2'

const authStore = useAuthStore()
const cartStore = useCartStore()
const { updateUserCart } = authStore
const { getCartItems, checkout } = cartStore
const { cartItems, totalAmount } = storeToRefs(cartStore)

onMounted(async () => {
  await getCartItems()
})

const handleCheckout = () => {
  Swal.fire({
    icon: 'info',
    title: '確定要結帳嗎?',
    text: `目前總金額：NT$ ${totalAmount.value}`,
    showCancelButton: true,
    confirmButtonText: '確定',
    cancelButtonText: '取消'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const cartId = await checkout()
        return updateUserCart(cartId)
      } catch (error) {
        console.error(error)
      }
    }
    return
  })
}
</script>

<template>
  <section>
    <h3 class="relative mb-6 mt-4 flex text-2xl font-bold">
      <CartIcon class="mr-2 h-8 w-8 text-orange-500" /> 購物車
    </h3>
    <table v-if="cartItems && cartItems.length" class="w-full table-auto">
      <thead class="border border-orange-400 bg-orange-300">
        <tr>
          <th>刪除</th>
          <th>圖片</th>
          <th>名稱</th>
          <th>單價</th>
          <th>數量</th>
          <th>總計</th>
        </tr>
      </thead>
      <tbody>
        <CartItem
          v-for="cartItem in cartItems"
          :key="cartItem.id"
          :cartItem="cartItem"
        />
      </tbody>
    </table>
    <p v-if="cartItems && !cartItems.length" class="text-center text-lg">
      購物車內沒有商品
    </p>
    <div class="mt-6 text-end">
      <p class="text-xl font-bold">總金額： NT$ {{ totalAmount }}</p>
      <button
        class="mt-2 rounded-sm bg-orange-400 px-16 py-1 hover:bg-orange-300"
        :disabled="cartItems && !cartItems.length"
        @click="handleCheckout"
      >
        結帳
      </button>
    </div>
  </section>
</template>
