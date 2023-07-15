<script setup>
import DeleteIcon from '../icons/DeleteIcon.vue'
import TackOffIcon from '../icons/TackOffIcon.vue'

defineProps(['active'])
</script>

<template>
	<tr class="border border-sky-400 text-center">
		<td>
			<DeleteIcon
				v-if="!active"
				class="mx-auto h-5 w-5 cursor-pointer hover:text-stone-600"
			/>
			<TackOffIcon
				v-if="active"
				class="mx-auto h-5 w-5 cursor-pointer hover:text-stone-600"
			/>
		</td>
		<td>
			<img
				src="https://res.cloudinary.com/dcgkzdjtr/image/upload/v1689350742/productImage/auzbhb0dq2hkgyligss1.png"
				class="mx-auto w-20"
			/>
		</td>
		<td>貓咪罐頭</td>
		<td>好吃的貓咪罐頭</td>
		<td>NT$ 230</td>
		<td>10</td>
		<td class="cursor-pointer underline hover:font-bold">更新</td>
	</tr>
</template>
