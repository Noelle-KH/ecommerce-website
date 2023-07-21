<script setup>
const props = defineProps(['color'])
const classes = `border border-${props.color}-400 bg-${props.color}-300`
</script>

<template>
  <table class="w-full table-auto">
    <thead :class="classes">
      <tr>
        <slot name="header"></slot>
      </tr>
    </thead>
    <tbody>
      <slot name="body"></slot>
    </tbody>
  </table>
</template>
