<script setup>
import { reactive, ref, watch } from 'vue'
import SearchIcon from '../icons/SearchIcon.vue'

const emits = defineEmits(['filterAmount', 'filterCategory'])
const props = defineProps(['categoriesData'])

const categories = ref(null)

const range = reactive({
  min: 0,
  max: 1000
})
const errorMessage = ref(null)

const clearError = () => {
  errorMessage.value = null
}

watch(errorMessage, () => {
  const timer = setTimeout(clearError, 2000)
  return () => clearTimeout(timer)
})

watch(
  () => props.categoriesData,
  (newProp) => {
    categories.value = newProp
  }
)

const handleFilterAmount = () => {
  if (
    range.max < range.min ||
    range.min > range.max ||
    range.min < 0 ||
    range.max < 0 ||
    isNaN(range.min) ||
    isNaN(range.max)
  ) {
    errorMessage.value = '請輸入有效的價格範圍'
  } else {
    emits('filterAmount', { min: range.min, max: range.max })
  }
}

const handleFilterCategory = (categoryId) => {
  emits('filterCategory', { categoryId })
}
</script>

<template>
  <aside class="w-56 flex-shrink-0">
    <div>
      <h3 class="mb-6 text-xl font-bold text-orange-400">篩選</h3>

      <p class="mb-3 text-lg font-semibold text-sky-400">分類</p>
      <div v-if="categories" class="mb-6">
        <span
          v-for="category in categories"
          :key="category.id"
          class="block cursor-pointer hover:underline"
          @click="handleFilterCategory(category.id)"
        >
          {{ category.name }}
        </span>
      </div>

      <p class="mb-3 text-lg font-semibold text-sky-400">金額</p>
      <label class="pr-1">NT$ </label>
      <input
        type="text"
        class="w-12 rounded-sm border border-stone-400 pl-1"
        v-model="range.min"
      />
      <span class="px-1">-</span>
      <input
        type="text"
        class="mr-2 w-12 rounded-sm border border-stone-400 pl-1"
        v-model="range.max"
      />
      <SearchIcon
        class="inline h-7 w-7 cursor-pointer active:scale-90"
        @click="handleFilterAmount"
      />
      <p v-if="errorMessage" class="ml-4 mt-2 text-sm text-red-500">
        {{ errorMessage }}
      </p>
    </div>
  </aside>
</template>
