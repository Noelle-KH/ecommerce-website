<script setup>
import SearchIcon from '../icons/SearchIcon.vue'
</script>

<template>
	<aside class="w-56 flex-shrink-0">
		<div>
			<h3 class="mb-6 text-xl font-bold text-orange-400">篩選</h3>
			<p class="mb-3 text-lg font-semibold text-sky-400">金額</p>
			<label class="pr-1">NT$ </label>
			<input type="text" class="w-10 rounded-sm border border-stone-400" />
			<span class="px-1">-</span>
			<input type="text" class="mr-2 w-10 rounded-sm border border-stone-400" />
			<SearchIcon class="inline h-7 w-7 cursor-pointer active:scale-90" />
		</div>
	</aside>
</template>
