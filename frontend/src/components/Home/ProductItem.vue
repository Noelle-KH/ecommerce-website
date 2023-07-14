<script setup>
import CartIcon from '../icons/CartIcon.vue'
</script>

<template>
	<div class="rounded-sm shadow-md">
		<img
			class="cursor-pointer object-cover hover:opacity-80"
			src="https://res.cloudinary.com/dcgkzdjtr/image/upload/v1689324160/productImage/lqoon7rooklmvpod2cge.png"
			alt=""
		/>
		<div class="p-3">
			<p class="mb-1 font-bold">汪喵潔牙護理酵素 汪喵潔牙護理酵素</p>
			<p class="text-lg font-bold text-sky-400">NT$ 320</p>

			<p class="flex items-center justify-end gap-3">
				<CartIcon
					class="h-6 w-6 cursor-pointer text-orange-400 hover:text-orange-500"
				/>
				<span class="text-sm text-stone-500">還剩 22件</span>
			</p>
		</div>
	</div>
</template>
