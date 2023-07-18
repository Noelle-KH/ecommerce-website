<script setup>
import { defineAsyncComponent } from 'vue'
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from './stores/auth'
import PageHeader from './components/Header/PageHeader.vue'
import PageFooter from './components/Footer/PageFooter.vue'
const LoginModal = defineAsyncComponent(() =>
  import('./components/Header/LoginModal.vue')
)

const authStore = useAuthStore()
const { showLoginModal } = storeToRefs(authStore)
</script>

<template>
  <PageHeader />
  <LoginModal v-if="showLoginModal" />
  <RouterView />
  <PageFooter />
</template>
