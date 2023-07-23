<script setup>
defineProps(['type'])
</script>

<template>
  <table class="w-full table-auto">
    <thead
      class="border"
      :class="[
        type === 'cart'
          ? 'border-orange-400 bg-orange-300'
          : 'border-sky-400 bg-sky-300'
      ]"
    >
      <tr>
        <slot name="header"></slot>
      </tr>
    </thead>
    <tbody>
      <slot name="body"></slot>
    </tbody>
  </table>
</template>
