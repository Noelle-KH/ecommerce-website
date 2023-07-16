<script setup>
import { computed } from 'vue'
import CartIcon from '../icons/CartIcon.vue'
import CartItem from './CartItem.vue'

const props = defineProps(['cartItems'])

const totalAmount = computed(() => {
  return props.cartItems.reduce((acc, item) => {
    return (acc += item.amount * item.product.price)
  }, 0)
})
</script>

<template>
  <section>
    <h3 class="relative mb-6 mt-4 flex text-2xl font-bold">
      <CartIcon class="mr-2 h-8 w-8 text-orange-500" /> 購物車
    </h3>
    <table class="w-full table-auto">
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
      <tbody v-for="cartItem in cartItems" :key="cartItem.id">
        <CartItem :cartItemData="cartItem" />
      </tbody>
    </table>
    <div class="mt-6 text-end">
      <p class="text-xl font-bold">總金額： NT$ {{ totalAmount }}</p>
      <button
        class="mt-2 rounded-sm bg-orange-400 px-16 py-1 hover:bg-orange-300"
      >
        結帳
      </button>
    </div>
  </section>
</template>
