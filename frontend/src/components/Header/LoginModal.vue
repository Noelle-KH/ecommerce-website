<script setup>
import { reactive, ref, watch } from 'vue'
import Swal from 'sweetalert2'
import { login } from '../../composable/api/useAuthApi'

const emits = defineEmits(['closeModal', 'authenticate'])

const title = ref('會員')
const formData = reactive({
	account: '',
	password: ''
})
const formError = reactive({
	account: null,
	password: null
})
const errorMessage = ref(null)

const clearError = () => {
	formError.account = null
	formError.password = null
	errorMessage.value = null
}

watch([formError, errorMessage], () => {
	const timer = setTimeout(clearError, 2000)
	return () => clearTimeout(timer)
})

const handleChangeTitle = () => {
	title.value === '會員' ? (title.value = '商家') : (title.value = '會員')
}

const handleCloseModal = () => {
	emits('closeModal')
}

const handleSubmit = async () => {
	clearError()

	if (!formData.account) {
		formError.account = '帳號不得為空'
	}

	if (!formData.password) {
		formError.password = '密碼不得為空'
	}

	if (!formError.account && !formError.password) {
		try {
			const role = title.value === '會員' ? 'buyer' : 'seller'
			const { user, token, message, code } = await login(
				role,
				formData.account,
				formData.password
			)

			if (!user && !token) {
				if (code === 4001) {
					formError.account = message
				} else if (code === 4002) {
					formError.account = message
					formError.password = message
				} else {
					errorMessage.value = message
				}
			}

			if (user && token) {
				localStorage.setItem('user', JSON.stringify(user))
				localStorage.setItem('token', token)

				Swal.fire({
					icon: 'success',
					title: message
				}).then(() => {
					emits('closeModal')
					emits('authenticate', true)
				})
			}
		} catch (error) {
			console.error(error)
		}
	}
}
</script>

<template>
	<div
		class="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-80"
		@click.self="handleCloseModal"
	>
		<form
			class="relative rounded-md bg-white p-12"
			@submit.prevent="handleSubmit"
		>
			<p
				class="absolute left-[10%] top-[-8%] cursor-pointer rounded-t bg-green-400 px-3 py-2 text-lg hover:font-bold"
			>
				註冊
			</p>
			<h2
				class="pb-6 text-center text-2xl"
				:class="[title === '會員' ? 'text-orange-400' : 'text-sky-400']"
			>
				{{ title }}登入
			</h2>

			<div>
				<label for="account" class="before:text-red-500 before:content-['*']">
					帳號：
					<span v-if="formError.account" class="text-xs text-red-500">
						{{ formError.account }}
					</span>
				</label>
				<input
					type="text"
					class="mb-6 mt-2 w-full rounded-sm border px-2 py-1 sm:block sm:w-80"
					:class="[formError.account ? 'border-red-400' : 'border-stone-400']"
					placeholder="請輸入帳號"
					v-model="formData.account"
				/>
			</div>

			<div>
				<label for="password" class="before:text-red-500 before:content-['*']">
					密碼：
					<span v-if="formError.password" class="text-xs text-red-500">
						{{ formError.password }}
					</span>
				</label>
				<input
					type="password"
					class="mt-2 w-full rounded-sm border px-2 py-1 sm:block sm:w-80"
					:class="[
						formError.password ? 'border-red-400' : 'border-stone-400',
						errorMessage ? 'mb-4' : 'mb-12'
					]"
					placeholder="請輸入密碼"
					v-model="formData.password"
				/>
			</div>
			<p v-if="errorMessage" class="mb-4 text-center text-xs text-red-500">
				{{ errorMessage }}
			</p>

			<button
				class="w-full rounded-sm border py-1"
				:class="[
					title === '會員'
						? 'bg-orange-400 hover:bg-orange-300'
						: 'bg-sky-400 hover:bg-sky-300'
				]"
				:disabled="formError.account && formData.password"
			>
				登入
			</button>
			<p class="mt-2 text-center">
				<span
					class="cursor-pointer tracking-widest text-sky-400 underline hover:text-sky-500"
					:class="[
						title === '會員'
							? 'text-sky-400 hover:text-sky-500'
							: 'text-orange-400 hover:text-orange-500'
					]"
					@click="handleChangeTitle"
				>
					{{ title === '會員' ? '商家' : '會員' }}登入
				</span>
			</p>
		</form>
	</div>
</template>
