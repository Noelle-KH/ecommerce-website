<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '../stores/product'
import HeroSection from '../components/Home/HeroSection.vue'
import SideBar from '../components/Home/SideBar.vue'
import ProductList from '../components/Home/ProductList.vue'

const productStore = useProductStore()
const { errorMessage } = storeToRefs(productStore)
const { getProducts, getCategories } = productStore

onMounted(async () => {
  await getProducts()
  await getCategories()
})
</script>

<template>
  <main>
    <HeroSection />
    <section class="relative flex min-h-screen px-10 py-12">
      <SideBar />
      <ProductList />
      <p v-if="errorMessage" class="absolute left-[35%] top-[20%]">
        {{ errorMessage }}
      </p>
    </section>
  </main>
</template>
