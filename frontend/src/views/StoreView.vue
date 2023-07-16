<script setup>
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AddItemModal from '../components/Store/AddItemModal.vue'
import StoreList from '../components/Store/StoreList.vue'
import { getAllProduct } from '../composable/api/useProductApi'

const props = defineProps(['isAuthenticate', 'role'])
const router = useRouter()

const showAddItemModal = ref(false)
const activeProducts = ref([])
const nonActiveProducts = ref([])
const isLoading = ref(false)
const errorMessage = ref(null)

const handleShowModal = (type) => {
	showAddItemModal.value = type
}

onMounted(async () => {
	try {
		if (!props.isAuthenticate || props.role !== 'seller') {
			Swal.fire({
				icon: 'error',
				title: '沒有使用該頁面的權限'
			})
			return router.replace({ name: 'HomeView' })
		}

		isLoading.value = true
		const activeData = await getAllProduct()
		const nonActiveData = await getAllProduct('', false)
		activeProducts.value = activeData.products
		nonActiveProducts.value = nonActiveData.products
	} catch (error) {
		errorMessage.value = error.message
	} finally {
		isLoading.value = false
	}
})
</script>

<template>
	<main class="px-10 py-12">
		<p v-if="errorMessage">{{ errorMessage }}</p>
		<p v-if="isLoading && !errorMessage">loading</p>
		<div v-if="activeProducts.length && nonActiveProducts.length">
			<AddItemModal v-if="showAddItemModal" @closeModal="handleShowModal" />
			<StoreList
				:active="true"
				:products="activeProducts"
				@openModal="handleShowModal"
			/>
			<StoreList :active="false" :products="nonActiveProducts" />
		</div>
	</main>
</template>
