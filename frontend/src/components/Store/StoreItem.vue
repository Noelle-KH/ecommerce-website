<script setup>
import DeleteIcon from '../icons/DeleteIcon.vue'
import PutOnIcon from '../icons/PutOnIcon.vue'
import TackOffIcon from '../icons/TackOffIcon.vue'

defineProps(['active', 'product'])
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
			<img :src="product.image" class="mx-auto w-20" />
		</td>
		<td>{{ product.name }}</td>
		<td>{{ product.description }}</td>
		<td>NT$ {{ product.price }}</td>
		<td>{{ product.stock }}</td>
		<td class="cursor-pointer underline hover:font-bold">
			<PutOnIcon v-if="!active" class="mx-auto h-5 w-5 cursor-pointer" />
			<span v-else>更新</span>
		</td>
	</tr>
</template>
