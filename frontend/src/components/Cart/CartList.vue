<script setup>
import CartIcon from '../icons/CartIcon.vue'
import CartItem from './CartItem.vue'
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
          <th>名稱</th>
          <th>單價</th>
          <th>數量</th>
          <th>總計</th>
        </tr>
      </thead>
      <tbody>
        <CartItem />
        <CartItem />
        <CartItem />
      </tbody>
    </table>
    <div class="mt-6 text-end">
      <p class="text-xl font-bold">總金額： NT$ 320</p>
      <button
        class="mt-2 rounded-sm bg-orange-400 px-16 py-1 hover:bg-orange-300"
      >
        結帳
      </button>
    </div>
  </section>
</template>
