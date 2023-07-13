<script setup>
import { RouterView } from 'vue-router'
import PageHeader from './components/Header/PageHeader.vue'
import PageFooter from './components/Footer/PageFooter.vue'
</script>

<template>
	<PageHeader />
	<main>
		<RouterView />
	</main>
	<PageFooter />
</template>
