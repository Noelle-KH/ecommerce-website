<script setup>
const emits = defineEmits(['closeModal'])

const handleCloseModal = () => {
	emits('closeModal', false)
}
</script>

<template>
	<div
		class="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-80"
		@click.self="handleCloseModal"
	>
		<form
			class="relative max-h-[90vh] overflow-y-scroll rounded-md bg-white p-12"
		>
			<h2 class="pb-6 text-center text-2xl font-bold text-sky-400">
				新增上架商品
			</h2>

			<div>
				<label for="name" class="before:text-red-500 before:content-['*']">
					商品名稱
				</label>
				<input
					type="text"
					class="mb-6 mt-2 w-full rounded-sm border px-2 py-1 sm:block"
					placeholder="請輸入商品名稱"
				/>
			</div>
			<div>
				<label for="name" class="before:text-red-500 before:content-['*']">
					商品描述
				</label>
				<textarea
					class="mb-6 mt-2 w-full rounded-sm border px-2 py-1 sm:block"
					placeholder="請輸入商品描述"
				></textarea>
			</div>
			<div>
				<label for="name" class="before:text-red-500 before:content-['*']">
					商品圖片
				</label>
				<input
					type="file"
					class="mb-6 mt-2 w-full rounded-sm border px-2 py-1 sm:block"
				/>
			</div>
			<div class="flex gap-5">
				<div>
					<label for="name" class="before:text-red-500 before:content-['*']">
						商品單價
					</label>
					<input
						type="number"
						class="mb-6 mt-2 w-full rounded-sm border px-2 py-1 sm:block"
						placeholder="請輸入商品單價"
					/>
				</div>
				<div>
					<label for="name" class="before:text-red-500 before:content-['*']">
						商品庫存
					</label>
					<input
						type="number"
						class="mb-12 mt-2 w-full rounded-sm border px-2 py-1 sm:block"
						placeholder="請輸入商品庫存"
					/>
				</div>
			</div>
			<button class="w-full rounded-sm border bg-sky-300 py-1 hover:bg-sky-200">
				新增商品
			</button>
		</form>
	</div>
</template>
