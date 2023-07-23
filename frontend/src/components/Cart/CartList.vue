<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../../stores/auth'
import { useCartStore } from '../../stores/cart'
import { useAlert } from '../../composable/useAlert'
import CartItem from './CartItem.vue'
import TableWrapper from '../UI/TableWrapper.vue'
import LoadAnimation from '../LoadAnimation.vue'
import CartIcon from '../icons/CartIcon.vue'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const { updateUserCart } = authStore
const { getCartItems, checkout } = cartStore
const { cartItems, totalAmount, errorMessage, isLoading } =
  storeToRefs(cartStore)
const { showAlert } = useAlert()

onMounted(async () => {
  try {
    await getCartItems()
  } catch (error) {
    showAlert('error', error)
    return router.replace({ name: 'HomeView' })
  }
})

const handleCheckout = () => {
  const text = `目前總金額：NT$ ${totalAmount.value}`

  showAlert('info', '確定要結帳嗎?', true, text).then(async (result) => {
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
    <LoadAnimation v-if="isLoading" />
    <p v-if="errorMessage" class="text-center text-red-500">
      {{ errorMessage }}
    </p>
    <TableWrapper type="cart" v-if="cartItems && cartItems.length">
      <template #header
        ><th>刪除</th>
        <th>圖片</th>
        <th>名稱</th>
        <th>單價</th>
        <th>數量</th>
        <th>總計</th>
      </template>
      <template #body>
        <CartItem
          v-for="cartItem in cartItems"
          :key="cartItem.id"
          :cartItem="cartItem"
        />
      </template>
    </TableWrapper>
    <p v-if="cartItems && !cartItems.length" class="text-center text-lg">
      購物車內沒有商品
    </p>
    <div class="mt-6 text-end">
      <p class="text-xl font-bold">總金額： NT$ {{ totalAmount }}</p>
      <button
        class="mt-2 rounded-sm bg-orange-400 px-16 py-1 hover:bg-orange-300 disabled:bg-stone-400"
        :disabled="cartItems && !cartItems.length"
        @click="handleCheckout"
      >
        結帳
      </button>
    </div>
  </section>
</template>
