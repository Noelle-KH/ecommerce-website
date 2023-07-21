<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '../../stores/product'
import ProductItem from './ProductItem.vue'
import LoadAnimation from '../LoadAnimation.vue'

const route = useRoute()
const productStore = useProductStore()
const { products, searchResult, searchQuery, errorMessage, isLoading } =
  storeToRefs(productStore)
const { getProducts } = productStore

onMounted(async () => {
  if (route.query) {
    if (Object.keys(route.query) === 'keyword') {
      searchQuery.value = Object.values(route.query)
    }
    await getProducts(route.query)
  } else {
    await getProducts()
  }
})
</script>

<template>
  <section class="relative flex-auto">
    <h3 class="mb-6 text-xl font-bold text-orange-400">新上市商品</h3>
    <p v-if="errorMessage" class="text-center text-red-500">
      {{ errorMessage }}
    </p>
    <LoadAnimation v-if="isLoading" />
    <div
      v-if="searchResult"
      class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        v-for="product in searchResult"
        :key="product.id"
        class="rounded-sm shadow-md"
        :class="[product.stock === 0 ? 'opacity-40' : '']"
      >
        <ProductItem :product="product" />
      </div>
    </div>
    <div
      v-else
      class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="rounded-sm shadow-md"
        :class="[product.stock === 0 ? 'opacity-40' : '']"
      >
        <ProductItem :product="product" />
      </div>
    </div>
    <p
      v-if="!searchResult && products && !products.length"
      class="text-center text-lg"
    >
      目前沒有商品
    </p>
    <p v-if="searchResult && !searchResult.length" class="text-center text-lg">
      找不到搜尋結果
    </p>
  </section>
</template>
