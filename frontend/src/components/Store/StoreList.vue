<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useStoreStore } from '../../stores/store'
import { useAlert } from '../../composable/useAlert'
import StoreItem from './StoreItem.vue'
import TableWrapper from '../UI/TableWrapper.vue'
import LoadAnimation from '../../components/LoadAnimation.vue'
import PutOnIcon from '../icons/PutOnIcon.vue'
import TackOffIcon from '../icons/TackOffIcon.vue'

const router = useRouter()
const storeStore = useStoreStore()
const { toggleModal, getStoreProducts } = storeStore
const { activeProducts, nonActiveProducts, isLoading, errorMessage } =
  storeToRefs(storeStore)
const { showAlert } = useAlert()

const props = defineProps(['active'])
const title = props.active ? '上架' : '下架'
const tableHeader = props.active ? '下架' : '刪除'
const products = props.active ? activeProducts : nonActiveProducts

onMounted(async () => {
  try {
    await Promise.all([getStoreProducts(), getStoreProducts(false)])
  } catch (error) {
    showAlert('error', error)
    return router.replace({ name: 'HomeView' })
  }
})
</script>

<template>
  <section :class="{ 'mt-4': active }">
    <h3
      class="relative mb-6 flex text-2xl font-bold"
      :class="{ 'mt-12': !active }"
    >
      <PutOnIcon v-if="active" class="mr-2 h-8 w-8 text-sky-500" />
      <TackOffIcon v-if="!active" class="mr-2 h-8 w-8 text-red-500" />
      {{ title }}商品清單
      <button
        v-if="active"
        class="absolute right-0 top-[-18%] rounded-md border bg-orange-400 px-8 py-3 text-sm font-bold hover:bg-orange-300"
        @click="toggleModal()"
      >
        新增上架商品
      </button>
    </h3>
    <LoadAnimation v-if="isLoading" />
    <p v-if="errorMessage" class="text-center text-red-500">
      {{ errorMessage }}
    </p>
    <TableWrapper type="store" v-if="products && products.length">
      <template #header>
        <th>{{ tableHeader }}</th>
        <th>商品圖片</th>
        <th>商品名稱</th>
        <th>商品描述</th>
        <th>商品單價</th>
        <th>商品庫存</th>
        <th>{{ active ? '更新' : '上架' }}商品</th>
      </template>
      <template #body>
        <StoreItem
          v-for="product in products"
          :key="product.id"
          :active="active"
          :product="product"
        />
      </template>
    </TableWrapper>
    <p
      v-if="!isLoading && products && !products.length"
      class="mt-2 text-center text-lg"
    >
      沒有{{ title }}商品
    </p>
  </section>
</template>
