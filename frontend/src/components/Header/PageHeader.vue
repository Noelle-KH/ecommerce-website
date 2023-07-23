<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../../stores/auth'
import { useProductStore } from '../../stores/product'
import { useCartStore } from '../../stores/cart'
import { useAlert } from '../../composable/useAlert'
import SearchIcon from '../icons/SearchIcon.vue'
import CartIcon from '../icons/CartIcon.vue'
import StoreIcon from '../icons/StoreIcon.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const productStore = useProductStore()
const cartStore = useCartStore()
const { isAuthenticate, user, showLoginModal } = storeToRefs(authStore)
const { toggleModal, changeAuthenticateStatus } = authStore
const { setSearchResult } = productStore
const { searchQuery } = storeToRefs(productStore)
const { cartItemsAmount } = storeToRefs(cartStore)
const { getCartItems } = cartStore
const { showAlert } = useAlert()

onMounted(async () => {
  if (isAuthenticate.value && user.value?.role === 'buyer') {
    await getCartItems()
  }
})

const handleSubmit = (keyword) => {
  searchQuery.value = keyword
  setSearchResult('keyword')
}

const handleLogout = () => {
  localStorage.clear()

  showAlert('success', '登出成功').then(() => {
    changeAuthenticateStatus(false)
    router.replace({ name: 'ProductList' })
  })
}
</script>

<template>
  <header
    class="w-full bg-white px-10 py-5"
    :class="[
      (route.path !== '/cart' || route.path !== '/store') && !showLoginModal
        ? 'sticky left-0 top-0 z-10 shadow-md'
        : ''
    ]"
  >
    <nav class="flex flex-wrap items-center justify-between">
      <div>
        <RouterLink :to="{ name: 'ProductList' }">
          <img class="w-24" src="../../assets/logo.png" alt="logo" />
        </RouterLink>
      </div>
      <div class="flex flex-1 flex-col items-center">
        <div class="flex">
          <input
            class="rounded-l-md border border-stone-600 px-2 sm:w-72"
            type="text"
            placeholder="搜尋關鍵字"
            v-model="searchQuery"
          />
          <button
            class="flex h-10 items-center rounded-r-md border border-stone-600 bg-orange-400 px-2 hover:bg-orange-300"
            @click="setSearchResult('keyword')"
          >
            <SearchIcon class="w-8" />
          </button>
        </div>
        <p class="mt-2 text-sm">
          熱門關鍵字：
          <button
            class="cursor-pointer rounded-full border border-stone-300 bg-stone-300 px-3 py-1 hover:bg-stone-200"
            @click="handleSubmit('狗狗罐頭')"
          >
            狗狗罐頭
          </button>
          <button
            class="ml-1 cursor-pointer rounded-full border border-stone-300 bg-stone-300 px-3 py-1 hover:bg-stone-200"
            @click="handleSubmit('貓貓罐頭')"
          >
            貓貓罐頭
          </button>
        </p>
      </div>
      <div class="flex items-center gap-5">
        <RouterLink
          v-if="route.path !== '/cart' || route.path !== '/store'"
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
          <div v-else class="relative">
            <CartIcon
              class="w-8 cursor-pointer hover:text-stone-600"
              @click="router.push({ name: 'CartView' })"
            />
            <span
              v-if="isAuthenticate"
              class="absolute right-[-15%] top-[5%] h-[20px] w-[20px] rounded-full bg-orange-400 text-center text-xs leading-5"
              >{{ cartItemsAmount }}
            </span>
          </div>
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
