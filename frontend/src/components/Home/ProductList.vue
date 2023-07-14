<script setup>
import ProductItem from './ProductItem.vue'
</script>

<template>
	<section>
		<h3 class="mb-6 text-xl font-bold text-orange-400">新上市商品</h3>
		<div
			class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
		>
			<ProductItem />
			<ProductItem />
			<ProductItem />
			<ProductItem />
			<ProductItem />
			<ProductItem />
			<ProductItem />
		</div>
	</section>
</template>
