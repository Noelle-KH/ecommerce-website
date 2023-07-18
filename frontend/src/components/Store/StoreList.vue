<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useStoreStore } from '../../stores/store'
import StoreItem from './StoreItem.vue'
import PutOnIcon from '../icons/PutOnIcon.vue'
import TackOffIcon from '../icons/TackOffIcon.vue'

const storeStore = useStoreStore()
const { activeProducts, nonActiveProducts } = storeToRefs(storeStore)
const { toggleModal } = storeStore

const props = defineProps(['active'])
const products = ref(props.active ? activeProducts : nonActiveProducts)
const title = props.active ? '上架' : '下架'
const tableHeader = props.active ? '下架' : '刪除'
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
    <table class="w-full table-auto">
      <thead class="border border-sky-400 bg-sky-300">
        <tr>
          <th>{{ tableHeader }}</th>
          <th>商品圖片</th>
          <th>商品名稱</th>
          <th>商品描述</th>
          <th>商品單價</th>
          <th>商品庫存</th>
          <th>{{ active ? '更新' : '上架' }}商品</th>
        </tr>
      </thead>
      <tbody v-if="products.length">
        <StoreItem
          v-for="product in products"
          :key="product.id"
          :active="active"
          :product="product"
        />
      </tbody>
    </table>
    <p v-if="!products.length" class="mt-2 text-center text-lg">
      沒有{{ title }}商品
    </p>
  </section>
</template>
