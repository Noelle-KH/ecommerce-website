<script setup>
import { defineAsyncComponent } from 'vue'
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from './stores/auth'
import PageHeader from './components/Header/PageHeader.vue'
import PageFooter from './components/Footer/PageFooter.vue'
const AuthModal = defineAsyncComponent(() =>
  import('./components/Header/AuthModal.vue')
)

const authStore = useAuthStore()
const { showAuthModal } = storeToRefs(authStore)
</script>

<template>
  <PageHeader />
  <AuthModal v-if="showAuthModal" />
  <RouterView />
  <PageFooter />
</template>
