<script setup>
import { useAuthStore } from '../../stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { showLoginModal } = storeToRefs(authStore)
</script>

<template>
  <section
    class="relative h-[80vh] bg-[url('../assets/hero.png')] bg-cover bg-center"
    :class="[!showLoginModal ? 'mt-[113px]' : '']"
  >
    <div
      class="absolute left-[4%] top-[45%] text-2xl font-bold leading-relaxed text-sky-300"
    >
      究竟有誰能抵擋那雙水汪汪的眼神呢？
      <br />
      讓我們為毛小孩帶來更多驚喜吧！
    </div>
  </section>
</template>
