<script setup>
import Swal from 'sweetalert2'
import { ref } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../../stores/auth'
import SearchIcon from '../icons/SearchIcon.vue'
import CartIcon from '../icons/CartIcon.vue'
import StoreIcon from '../icons/StoreIcon.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { isAuthenticate,  user } = storeToRefs(authStore)
const { toggleModal } = authStore
const { changeAuthenticateStatus } = authStore
const emits = defineEmits(['filterKeyword'])

const keyword = ref('')

const handleGetCart = () => {
  if (!isAuthenticate.value) {
    Swal.fire({
      icon: 'error',
      text: '請先註冊或登入才能使用功能'
    })
  } else {
    router.push({ name: 'CartView' })
  }
}

const handleSubmit = () => {
  emits('filterKeyword', { keyword: keyword.value })
}

const handleLogout = () => {
  localStorage.clear()

  Swal.fire({
    icon: 'success',
    title: '登出成功'
  }).then(() => {
    changeAuthenticateStatus(false)
    router.replace({ name: 'HomeView' })
  })
}
</script>

<template>
  <header class="px-10 py-5">
    <nav class="flex flex-wrap items-center justify-between">
      <div>
        <RouterLink :to="{ name: 'HomeView' }">
          <img class="w-24" src="../../assets/logo.png" alt="logo" />
        </RouterLink>
      </div>
      <div class="flex flex-1 flex-col items-center">
        <div class="flex">
          <input
            class="rounded-l-md border border-stone-600 px-2 sm:w-72"
            type="text"
            placeholder="搜尋關鍵字"
            v-model="keyword"
          />
          <button
            class="flex h-10 items-center rounded-r-md border border-stone-600 bg-orange-400 px-2 hover:bg-orange-300"
            @click="handleSubmit"
          >
            <SearchIcon class="w-8" />
          </button>
        </div>
        <p class="mt-2 text-sm">
          熱門關鍵字：
          <button
            class="cursor-pointer rounded-full border border-stone-300 bg-stone-300 px-3 py-1 hover:bg-stone-200"
          >
            狗狗罐頭
          </button>
          <button
            class="ml-1 cursor-pointer rounded-full border border-stone-300 bg-stone-300 px-3 py-1 hover:bg-stone-200"
          >
            貓貓罐頭
          </button>
        </p>
      </div>
      <div class="flex items-center gap-5">
        <RouterLink
          v-if="route.path === '/'"
          :to="
            user?.role === 'seller'
              ? { name: 'StoreView' }
              : { name: 'CartView' }
          "
        >
          <StoreIcon
            v-if="user?.role === 'seller'"
            class="w-8 cursor-pointer hover:text-stone-600"
          />
          <CartIcon
            v-else
            class="w-8 cursor-pointer hover:text-stone-600"
            @click="handleGetCart"
          />
        </RouterLink>
        <p v-else class="text-sm font-bold">{{ user?.account }}</p>
        <button
          class="rounded-md px-8 py-2"
          :class="
            user?.role === 'seller'
              ? 'bg-sky-400 hover:bg-sky-300  '
              : 'bg-orange-400 hover:bg-orange-300'
          "
          @click="isAuthenticate ? handleLogout() : toggleModal()"
        >
          {{ isAuthenticate ? '登出' : '登入' }}
        </button>
      </div>
    </nav>
  </header>
</template>
