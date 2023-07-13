<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import PageHeader from './components/Header/PageHeader.vue'
import PageFooter from './components/Footer/PageFooter.vue'
import LoginModal from './components/Header/LoginModal.vue'

const showLoginModal = ref(false)
const handleShowModal = () => {
	showLoginModal.value = !showLoginModal.value
}
</script>

<template>
	<PageHeader @openModal="handleShowModal" />
	<LoginModal v-if="showLoginModal" @closeModal="handleShowModal" />
	<main>
		<RouterView />
	</main>
	<PageFooter />
</template>
