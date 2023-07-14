<script setup>
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import CartIcon from '../icons/CartIcon.vue'
import { computed } from 'vue'

const props = defineProps(['product', 'isAuthenticate', 'role'])
const router = useRouter()

const formatName = computed(() => {
	return props.product.name.length > 30
		? `${props.product.name.slice(0, 25)}...`
		: props.product.name
})

const handleGetCart = () => {
	if (!props.isAuthenticate) {
		Swal.fire({
			icon: 'error',
			text: '請先註冊或登入才能使用功能'
		})
	} else {
		router.push({ name: 'CartView' })
	}
}
</script>

<template>
	<img
		class="cursor-pointer object-cover hover:opacity-80"
		:src="product.image"
		:alt="product.name"
	/>
	<div class="p-3">
		<p class="mb-1 font-bold">{{ formatName }}</p>
		<p class="text-lg font-bold text-sky-400">NT$ {{ product.price }}</p>

		<p class="flex items-center justify-end gap-3">
			<CartIcon
				v-show="role !== 'seller'"
				class="h-6 w-6 cursor-pointer text-orange-400 hover:text-orange-500"
				@click="handleGetCart"
			/>
			<span class="text-sm text-stone-500">還剩 {{ product.stock }} 件</span>
		</p>
	</div>
</template>
