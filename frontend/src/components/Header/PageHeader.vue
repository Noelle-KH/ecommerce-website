<script setup>
import { useRouter, RouterLink } from 'vue-router'
import Swal from 'sweetalert2'
import SearchIcon from '../icons/SearchIcon.vue'
import CartIcon from '../icons/CartIcon.vue'
import StoreIcon from '../icons/StoreIcon.vue'

const emits = defineEmits(['openModal', 'nonAuthenticate'])
const props = defineProps(['isAuthenticate', 'role'])
const router = useRouter()

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

const handleLogout = () => {
	localStorage.clear()

	Swal.fire({
		icon: 'success',
		title: '登出成功'
	}).then(() => {
		emits('nonAuthenticate', false)
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
					/>
					<button
						class="flex h-10 items-center rounded-r-md border border-stone-600 bg-orange-400 px-2 hover:bg-orange-300"
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
			<div class="flex gap-5">
				<StoreIcon
					v-if="role === 'seller'"
					class="w-8 cursor-pointer hover:text-stone-600"
				/>
				<CartIcon
					v-else
					class="w-8 cursor-pointer hover:text-stone-600"
					@click="handleGetCart"
				/>
				<button
					class="rounded-lg bg-orange-400 px-8 hover:bg-orange-300"
					@click="isAuthenticate ? handleLogout() : handleShowModal()"
				>
					{{ isAuthenticate ? '登出' : '登入' }}
				</button>
			</div>
		</nav>
	</header>
</template>
