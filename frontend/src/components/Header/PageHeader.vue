<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import Swal from 'sweetalert2'
import SearchIcon from '../icons/SearchIcon.vue'
import CartIcon from '../icons/CartIcon.vue'
import StoreIcon from '../icons/StoreIcon.vue'

const emits = defineEmits(['openModal', 'nonAuthenticate', 'filterKeyword'])
const props = defineProps(['isAuthenticate', 'role'])
const router = useRouter()

const keyword = ref('')

const handleShowModal = () => {
	emits('openModal')
}

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

const handleSubmit = () => {
	emits('filterKeyword', { keyword: keyword.value })
}

const handleLogout = () => {
	localStorage.clear()

	Swal.fire({
		icon: 'success',
		title: '登出成功'
	}).then(() => {
		emits('nonAuthenticate', false)
		router.replace({ name: 'HomeView' })
	})
}
</script>

<template>
	<header class="px-10 py-5">
		<nav class="flex flex-wrap items-center justify-between">
			<div>
				<RouterLink :to="{ name: 'HomeView' }">
					<img class="w-24" src="src/assets/logo.png" alt="logo" />
				</RouterLink>
			</div>
			<div class="flex flex-1 flex-col items-center">
				<div class="flex">
					<input
						class="rounded-l-md border border-stone-600 px-2 sm:w-72"
						type="text"
						placeholder="搜尋關鍵字"
						v-model="keyword"
					/>
					<button
						class="flex h-10 items-center rounded-r-md border border-stone-600 bg-orange-400 px-2 hover:bg-orange-300"
						@click="handleSubmit"
					>
						<SearchIcon class="w-8" />
					</button>
				</div>
				<p class="mt-2 text-sm">
					熱門關鍵字：
					<button
						class="cursor-pointer rounded-full border border-stone-300 bg-stone-300 px-3 py-1 hover:bg-stone-200"
					>
						狗狗罐頭
					</button>
					<button
						class="ml-1 cursor-pointer rounded-full border border-stone-300 bg-stone-300 px-3 py-1 hover:bg-stone-200"
					>
						貓貓罐頭
					</button>
				</p>
			</div>
			<div class="flex items-center gap-5">
				<RouterLink
					:to="role === 'seller' ? { name: 'StoreView' } : { name: 'CartView' }"
				>
					<StoreIcon
						v-if="role === 'seller'"
						class="w-8 cursor-pointer hover:text-stone-600"
					/>
					<CartIcon
						v-else
						class="w-8 cursor-pointer hover:text-stone-600"
						@click="handleGetCart"
					/>
				</RouterLink>

				<button
					class="rounded-md bg-orange-400 px-8 py-2 hover:bg-orange-300"
					@click="isAuthenticate ? handleLogout() : handleShowModal()"
				>
					{{ isAuthenticate ? '登出' : '登入' }}
				</button>
			</div>
		</nav>
	</header>
</template>
