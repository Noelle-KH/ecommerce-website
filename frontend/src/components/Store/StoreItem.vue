<script setup>
import Swal from 'sweetalert2'
import DeleteIcon from '../icons/DeleteIcon.vue'
import PutOnIcon from '../icons/PutOnIcon.vue'
import TackOffIcon from '../icons/TackOffIcon.vue'
import { useStoreStore } from '../../stores/store'

const storeStore = useStoreStore()
const { toggleActive, deleteProduct } = storeStore
defineProps(['active', 'product'])

const handleDeleteProduct = (id) => {
  Swal.fire({
    icon: 'warning',
    title: '確定要刪除商品嗎?',
    showCancelButton: true,
    confirmButtonText: '確定',
    cancelButtonText: '取消'
  }).then((result) => {
    if (result.isConfirmed) {
      return deleteProduct(id)
    }
    return
  })
}
</script>

<template>
  <tr class="border border-sky-400 text-center">
    <td>
      <DeleteIcon
        v-if="!active"
        class="mx-auto h-5 w-5 cursor-pointer hover:text-stone-600"
        @click="handleDeleteProduct(product.id)"
      />
      <TackOffIcon
        v-if="active"
        class="mx-auto h-5 w-5 cursor-pointer hover:text-stone-600"
        @click="toggleActive(product.id, active)"
      />
    </td>
    <td>
      <img :src="product.image" class="mx-auto w-20" />
    </td>
    <td>{{ product.name }}</td>
    <td>{{ product.description }}</td>
    <td>NT$ {{ product.price }}</td>
    <td>{{ product.stock }}</td>
    <td class="cursor-pointer underline hover:font-bold">
      <PutOnIcon
        v-if="!active"
        class="mx-auto h-5 w-5 cursor-pointer"
        @click="toggleActive(product.id, active)"
      />
      <span v-else>更新</span>
    </td>
  </tr>
</template>
