<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import PageHeader from './components/Header/PageHeader.vue'
import PageFooter from './components/Footer/PageFooter.vue'
import LoginModal from './components/Header/LoginModal.vue'

const showLoginModal = ref(false)
const isAuthenticate = ref(localStorage.getItem('token') !== null)

const handleShowModal = () => {
	showLoginModal.value = !showLoginModal.value
}

const handleIsAuthenticate = (status) => {
	isAuthenticate.value = status
}
</script>

<template>
	<PageHeader
		@openModal="handleShowModal"
		@nonAuthenticate="handleIsAuthenticate"
		:isAuthenticate="isAuthenticate"
	/>
	<LoginModal
		v-if="showLoginModal"
		@closeModal="handleShowModal"
		@authenticate="handleIsAuthenticate"
	/>
	<RouterView :isAuthenticate="isAuthenticate" />
	<PageFooter />
</template>
