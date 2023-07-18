<script setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '../../stores/product'
import ProductItem from './ProductItem.vue'

const productStore = useProductStore()
const { products } = storeToRefs(productStore)
</script>

<template>
  <section>
    <h3 class="mb-6 text-xl font-bold text-orange-400">新上市商品</h3>
    <div
      v-if="products"
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
  </section>
</template>
