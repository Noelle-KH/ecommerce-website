<script setup>
import { onMounted, ref } from 'vue'
import HeroSection from '../components/Home/HeroSection.vue'
import SideBar from '../components/Home/SideBar.vue'
import ProductList from '../components/Home/ProductList.vue'
import LoadAnimation from '../components/LoadAnimation.vue'
import { getAllProduct } from '../composable/api/useProductApi'

defineProps(['isAuthenticate', 'role'])

const products = ref([])
const searchResult = ref(null)
const errorMessage = ref(null)
const isLoading = ref(false)

onMounted(async () => {
	try {
		isLoading.value = true
		const data = await getAllProduct()
		products.value = data.products
	} catch (error) {
		errorMessage.value = error.message
	} finally {
		isLoading.value = false
	}
})

const handleSearchResult = async (filterQuery) => {
	try {
		isLoading.value = true
		const data = await getAllProduct(filterQuery)
		searchResult.value = data.products
	} catch (error) {
		errorMessage.value = error.message
	} finally {
		isLoading.value = false
	}
}
</script>

<template>
	<main>
		<HeroSection />
		<section class="relative flex min-h-screen px-10 py-12">
			<SideBar @filterQuery="handleSearchResult" />
			<ProductList
				v-if="searchResult ? searchResult : products"
				:isAuthenticate="isAuthenticate"
				:role="role"
				:products="searchResult ? searchResult : products"
			/>
			<LoadAnimation
				v-if="isLoading && !errorMessage"
				class="absolute left-[50%] top-[20%]"
			/>
			<p v-if="errorMessage" class="absolute left-[35%] top-[20%]">
				{{ errorMessage }}
			</p>
		</section>
	</main>
</template>
