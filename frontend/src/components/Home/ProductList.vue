<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '../../stores/product'
import ProductItem from './ProductItem.vue'
import LoadAnimation from '../LoadAnimation.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const {
  products,
  searchResult,
  searchQuery,
  sortedProduct,
  errorMessage,
  isLoading,
  orderBy
} = storeToRefs(productStore)
const { getProducts } = productStore

onMounted(async () => {
  if (Object.keys(route.query).includes('keyword')) {
    searchQuery.value = Object.values(route.query)[0]
  }
  orderBy.value = route.query.orderBy || 'createdAt'
  await getProducts({ ...route.query, orderBy: orderBy.value })
})

const handleChangeOrderBy = () => {
  router.replace({
    name: 'SearchView',
    query: { ...route.query, orderBy: orderBy.value }
  })
}
</script>

<template>
  <section class="relative flex-auto">
    <div class="flex items-start justify-between">
      <h3 class="mb-6 text-xl font-bold text-orange-400">上架商品</h3>
      <select
        class="cursor-pointer rounded-sm border border-stone-500 p-1"
        v-model="orderBy"
        @change="handleChangeOrderBy"
      >
        <option value="createdAt">依上架時間排序</option>
        <option value="priceDesc">依金額高到低排序</option>
        <option value="priceAsc">依金額低到高排序</option>
      </select>
    </div>
    <p v-if="errorMessage" class="text-center text-red-500">
      {{ errorMessage }}
    </p>
    <LoadAnimation v-if="isLoading" />
    <div
      v-if="searchResult"
      class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        v-for="product in sortedProduct"
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
