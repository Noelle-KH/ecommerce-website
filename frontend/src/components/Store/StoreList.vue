<script setup>
import { ref, watch } from 'vue'
import StoreItem from './StoreItem.vue'
import PutOnIcon from '../icons/PutOnIcon.vue'
import TackOffIcon from '../icons/TackOffIcon.vue'

const props = defineProps(['active', 'productsData'])
const emits = defineEmits(['openModal', 'toggleActive', 'deleteProduct'])

const products = ref(props.productsData)

const title = props.active ? '上架' : '下架'
const tableHeader = props.active ? '下架' : '刪除'

watch(
	() => props.productsData,
	(newProducts) => {
		products.value = newProducts
	}
)

const handleOpenModal = () => {
	emits('openModal', true)
}

const handleToggleActive = (id, active) => {
	emits('toggleActive', id, active)
}

const handleDeleteProduct = (id) => {
	emits('deleteProduct', id)
}
</script>

<template>
	<section :class="{ 'mt-4': active }">
		<h3
			class="relative mb-6 flex text-2xl font-bold"
			:class="{ 'mt-12': !active }"
		>
			<PutOnIcon v-if="active" class="mr-2 h-8 w-8 text-sky-500" />
			<TackOffIcon v-if="!active" class="mr-2 h-8 w-8 text-red-500" />
			{{ title }}商品清單
			<button
				v-if="active"
				class="absolute right-0 top-[-18%] rounded-md border bg-orange-400 px-8 py-3 text-sm font-bold hover:bg-orange-300"
				@click="handleOpenModal"
			>
				新增上架商品
			</button>
		</h3>
		<table class="w-full table-auto">
			<thead class="border border-sky-400 bg-sky-300">
				<tr>
					<th>{{ tableHeader }}</th>
					<th>商品圖片</th>
					<th>商品名稱</th>
					<th>商品描述</th>
					<th>商品單價</th>
					<th>商品庫存</th>
					<th>{{ active ? '更新' : '上架' }}商品</th>
				</tr>
			</thead>
			<tbody v-for="product in products" :key="product.id">
				<StoreItem
					:active="active"
					:product="product"
					@deleteProduct="handleDeleteProduct"
					@toggleActive="handleToggleActive"
				/>
			</tbody>
		</table>
	</section>
</template>
