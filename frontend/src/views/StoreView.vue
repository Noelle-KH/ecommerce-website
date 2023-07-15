<script setup>
import { ref } from 'vue'
import AddItemModal from '../components/Store/AddItemModal.vue'
import StoreList from '../components/Store/StoreList.vue'

const showAddItemModal = ref(false)

const handleShowModal = (type) => {
	showAddItemModal.value = type
}
</script>

<template>
	<main class="px-10 py-12">
		<AddItemModal v-if="showAddItemModal" @closeModal="handleShowModal" />
		<StoreList :active="true" @openModal="handleShowModal" />
		<StoreList :active="false" />
	</main>
</template>
