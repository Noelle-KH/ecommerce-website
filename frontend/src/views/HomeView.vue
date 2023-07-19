<script setup>
import HeroSection from '../components/Home/HeroSection.vue'
import SideBar from '../components/Home/SideBar.vue'
import ProductList from '../components/Home/ProductList.vue'
</script>

<template>
  <main>
    <HeroSection />
    <section class="flex min-h-screen px-10 py-12">
      <SideBar />
      <ProductList />
    </section>
  </main>
</template>
