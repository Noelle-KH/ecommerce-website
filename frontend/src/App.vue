<script setup>
import { defineAsyncComponent, ref } from 'vue'
import { RouterView } from 'vue-router'
import PageHeader from './components/Header/PageHeader.vue'
import PageFooter from './components/Footer/PageFooter.vue'
const LoginModal = defineAsyncComponent(() =>
  import('./components/Header/LoginModal.vue')
)

const showLoginModal = ref(false)
const keyword = ref('')

const handleShowModal = () => {
  showLoginModal.value = !showLoginModal.value
}

const handleSearchKeyword = (filterQuery) => {
  keyword.value = filterQuery
}
</script>

<template>
  <PageHeader
    @openModal="handleShowModal"
    @filterKeyword="handleSearchKeyword"
  />
  <LoginModal v-if="showLoginModal" @closeModal="handleShowModal" />
  <RouterView :keyword="keyword" />
  <PageFooter />
</template>
