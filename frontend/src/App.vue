<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import PageHeader from './components/Header/PageHeader.vue'
import PageFooter from './components/Footer/PageFooter.vue'
import LoginModal from './components/Header/LoginModal.vue'

const showLoginModal = ref(false)
const isAuthenticate = ref(localStorage.getItem('token') !== null)
const role = ref(JSON.parse(localStorage.getItem('user'))?.role)
const keyword = ref('')

const handleShowModal = () => {
	showLoginModal.value = !showLoginModal.value
}

const handleIsAuthenticate = (status) => {
	isAuthenticate.value = status
	if (status) {
		role.value = JSON.parse(localStorage.getItem('user')).role
	} else {
		role.value = null
	}
}
const handleSearchKeyword = (filterQuery) => {
	keyword.value = filterQuery
}
</script>

<template>
	<PageHeader
		@openModal="handleShowModal"
		@nonAuthenticate="handleIsAuthenticate"
		@filterKeyword="handleSearchKeyword"
		:isAuthenticate="isAuthenticate"
		:role="role"
	/>
	<LoginModal
		v-if="showLoginModal"
		@closeModal="handleShowModal"
		@authenticate="handleIsAuthenticate"
	/>
	<RouterView
		:isAuthenticate="isAuthenticate"
		:role="role"
		:keyword="keyword"
	/>
	<PageFooter />
</template>
