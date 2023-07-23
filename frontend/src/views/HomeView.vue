<script setup>
import { RouterView } from 'vue-router'
import HeroSection from '../components/Home/HeroSection.vue'
import SideBar from '../components/Home/SideBar.vue'
</script>

<template>
  <main>
    <HeroSection />
    <section class="flex min-h-screen px-10 py-12">
      <SideBar />
      <RouterView />
    </section>
  </main>
</template>
