<script setup>
import { onMounted, ref, watch } from 'vue'
import HeroSection from '../components/Home/HeroSection.vue'
import SideBar from '../components/Home/SideBar.vue'
import ProductList from '../components/Home/ProductList.vue'
import LoadAnimation from '../components/LoadAnimation.vue'
import { getAllProduct, getCategories } from '../composable/api/useProductApi'

const props = defineProps(['isAuthenticate', 'role', 'keyword'])

const products = ref([])
const categories = ref([])
const searchResult = ref(null)
const errorMessage = ref(null)
const isLoading = ref(false)

onMounted(async () => {
	try {
		isLoading.value = true
		const productsData = await getAllProduct()
		const categoriesData = await getCategories()
		products.value = productsData.products
		categories.value = categoriesData.categories
	} catch (error) {
		errorMessage.value = error.message
	} finally {
		isLoading.value = false
	}
})

watch(
	() => props.keyword,
	(keyword) => {
		handleSearchResult(keyword)
	}
)

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
			<SideBar
				@filterAmount="handleSearchResult"
				@filterCategory="handleSearchResult"
				:categoriesData="categories ? categories : ''"
			/>
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
