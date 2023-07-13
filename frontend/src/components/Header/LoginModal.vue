<script setup>
import { reactive, ref, watch } from 'vue'

const emits = defineEmits(['closeModal'])
const role = ref('會員')
const formData = reactive({
	account: '',
	password: ''
})
const formError = reactive({
	account: null,
	password: null
})

const clearFormError = () => {
	formError.account = null
	formError.password = null
}

watch(formError, () => {
	const timer = setTimeout(clearFormError, 2000)
	return () => clearTimeout(timer)
})

const handleChangeRole = () => {
	role.value === '會員' ? (role.value = '商家') : (role.value = '會員')
}

const handleCloseModal = () => {
	emits('closeModal', false)
}

const handleSubmit = () => {
	if (!formData.account) {
		formError.account = '帳號不得為空'
	}

	if (!formData.password) {
		formError.password = '密碼不得為空'
	}

	if (!formError.account && !formError.password) {
		// fetch api
	}
}
</script>

<template>
	<div
		class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-80"
		@click.self="handleCloseModal"
	>
		<p
			class="absolute left-[35%] top-3 cursor-pointer rounded-t bg-green-400 px-3 py-2 text-lg hover:top-2"
		>
			註冊
		</p>
		<form class="z-10 rounded-md bg-white p-12" @submit.prevent="handleSubmit">
			<h2
				class="pb-6 text-center text-2xl"
				:class="[role === '會員' ? 'text-orange-400' : 'text-sky-400']"
			>
				{{ role }}登入
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
					class="mb-6 mt-2 w-full border px-2 py-1 sm:block sm:w-80"
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
					class="mb-12 mt-2 w-full border px-2 py-1 sm:block sm:w-80"
					placeholder="請輸入密碼"
					v-model="formData.password"
				/>
			</div>

			<button
				class="w-full rounded-sm border py-1"
				:class="[
					role === '會員'
						? 'bg-orange-400 hover:bg-orange-300'
						: 'bg-sky-400 hover:bg-sky-300'
				]"
			>
				登入
			</button>
			<p class="mt-2 text-center">
				<span
					class="cursor-pointer tracking-widest text-sky-400 underline hover:text-sky-500"
					:class="[
						role === '會員'
							? 'text-sky-400 hover:text-sky-500'
							: 'text-orange-400 hover:text-orange-500'
					]"
					@click="handleChangeRole"
				>
					{{ role === '會員' ? '商家' : '會員' }}登入
				</span>
			</p>
		</form>
	</div>
</template>
