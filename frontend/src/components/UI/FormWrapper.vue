<script setup>
const props = defineProps(['styles', 'toggle', 'submit'])
const classes = `relative rounded-md bg-white p-12 ${props.styles}`
</script>

<template>
  <div
    class="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-80"
    @click.self="toggle"
  >
    <form :class="classes" @submit.prevent="submit">
      <slot></slot>
    </form>
  </div>
</template>
