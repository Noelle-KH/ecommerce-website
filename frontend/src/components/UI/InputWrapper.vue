<script setup>
defineProps(['name', 'auth', 'data', 'kind', 'error', 'wrapper', 'modelValue'])
</script>

<template>
  <div :class="[wrapper ? 'flex-1' : '']">
    <label class="before:text-red-500 before:content-['*']">
      {{ name }}：
      <span v-if="error" class="text-xs text-red-500">
        {{ error }}
      </span>
    </label>
    <slot v-if="kind"></slot>
    <input
      v-else
      v-bind="$attrs"
      class="mb-6 mt-2 w-full rounded-sm border px-2 py-1 sm:block"
      :class="[
        error ? 'border-red-400' : 'border-stone-400',
        auth ? 'sm:w-80' : ''
      ]"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
