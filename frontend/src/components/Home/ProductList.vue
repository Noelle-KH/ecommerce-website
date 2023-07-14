<script setup>
import { onMounted, ref } from 'vue'
import ProductItem from './ProductItem.vue'
import LoadAnimation from '../LoadAnimation.vue'
import { getAllProduct } from '../../composable/api/useProductApi'

defineProps(['isAuthenticate'])

const products = ref(null)
const errorMessage = ref(null)
const isLoading = ref(false)

onMounted(async () => {
	try {
		isLoading.value = true
		const data = await getAllProduct()
		products.value = data.products
		isLoading.value = false
	} catch (error) {
		errorMessage.value = error.message
	}
})
</script>

<template>
	<section>
		<h3 class="mb-6 text-xl font-bold text-orange-400">新上市商品</h3>
		<LoadAnimation v-if="isLoading" />
		<div
			v-if="products"
			class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
		>
			<div
				v-for="product in products"
				:key="product.id"
				class="rounded-sm shadow-md"
			>
				<ProductItem :product="product" :isAuthenticate="isAuthenticate" />
			</div>
		</div>
	</section>
</template>
