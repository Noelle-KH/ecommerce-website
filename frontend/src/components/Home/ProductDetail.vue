<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../../stores/auth'
import { useProductStore } from '../../stores/product'
import { useCartStore } from '../../stores/cart'
import { useAlert } from '../../composable/useAlert'
import CartIcon from '../icons/CartIcon.vue'
import LoadAnimation from '../LoadAnimation.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const productStore = useProductStore()
const cartStore = useCartStore()
const { isAuthenticate, user } = storeToRefs(authStore)
const { product, errorMessage, isLoading } = storeToRefs(productStore)
const { getProductData } = productStore
const { addNewCartItem } = cartStore
const { showAlert } = useAlert()

onMounted(async () => {
  await getProductData(route.params.id)
})

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
  <section class="flex-auto">
    <h3 class="mb-6 text-xl font-bold text-orange-400">商品詳細資料</h3>
    <p v-if="errorMessage" class="text-center text-red-500">
      {{ errorMessage }}
    </p>
    <LoadAnimation v-if="isLoading" />
    <div v-if="product" class="flex justify-center">
      <div class="flex-1">
        <img :src="product.image" :alt="product.name" class="w-96 shadow-md" />
      </div>
      <div class="flex flex-1 flex-col gap-6">
        <h4 class="text-lg font-bold text-sky-400">
          商品名稱： {{ product.name }}
        </h4>
        <p>商品分類： {{ product.category.name }}</p>
        <p>商品敘述： {{ product.description }}</p>
        <p>商品單價： NT$ {{ product.price }}</p>
        <p>商品庫存： {{ product.stock }} 件</p>
        <div class="flex justify-center gap-3">
          <CartIcon
            v-show="user?.role !== 'seller' && product.stock !== 0"
            class="h-6 w-6 cursor-pointer text-orange-400 hover:text-orange-500"
            @click="handleAddCartItem(product.id)"
          />
          <button
            class="hover:text-sky-500 hover:underline"
            @click="router.go(-1)"
          >
            返回
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
