<script setup>
import SideBar from '../components/Home/SideBar.vue'
import ProductList from '../components/Home/ProductList.vue'
defineProps(['isAuthenticate', 'role'])
</script>

<template>
	<main>
		<section
			class="relative h-[80vh] bg-[url('../assets/hero.png')] bg-cover bg-center"
		>
			<div
				class="absolute left-[4%] top-[45%] text-2xl font-bold leading-relaxed text-sky-300"
			>
				究竟有誰能抵擋那雙水汪汪的眼神呢？
				<br />
				讓我們為毛小孩帶來更多驚喜吧！
			</div>
		</section>
		<section class="flex min-h-screen px-10 py-12">
			<SideBar />
			<ProductList :isAuthenticate="isAuthenticate" :role="role" />
		</section>
	</main>
</template>
