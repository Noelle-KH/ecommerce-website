<script setup>
import DeleteIcon from '../icons/DeleteIcon.vue'
import MinusIcon from '../icons/MinusIcon.vue'
import PlusIcon from '../icons/PlusIcon.vue'
</script>

<template>
	<tr class="text-center border border-orange-400">
		<td>
			<DeleteIcon class="mx-auto h-5 w-5 cursor-pointer hover:text-stone-600" />
		</td>
		<td class="flex items-center justify-center gap-5">
			<img
				src="https://res.cloudinary.com/dcgkzdjtr/image/upload/v1689350742/productImage/auzbhb0dq2hkgyligss1.png"
				class="w-20"
				alt=""
			/>
			<p>貓咪罐頭</p>
		</td>
		<td>NT$ 230</td>
		<td>
			<div class="flex items-center justify-center">
				<MinusIcon class="h-5 w-5 cursor-pointer hover:text-stone-500" />
				<p class="cursor-pointer px-3">1</p>
				<PlusIcon class="h-5 w-5 cursor-pointer hover:text-stone-500" />
			</div>
		</td>
		<td>NT$ 230</td>
	</tr>
</template>
