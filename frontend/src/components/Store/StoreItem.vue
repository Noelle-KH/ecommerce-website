<script setup>
import DeleteIcon from '../icons/DeleteIcon.vue'
import PutOnIcon from '../icons/PutOnIcon.vue'
import TackOffIcon from '../icons/TackOffIcon.vue'
import { useStoreStore } from '../../stores/store'
import { useAlert } from '../../composable/useAlert'

defineProps(['active', 'product'])

const storeStore = useStoreStore()
const { toggleModal, toggleActive, deleteProduct } = storeStore
const { showAlert } = useAlert()

const handleDeleteProduct = (id) => {
  showAlert('warning', '確定要刪除商品嗎?', true).then((result) => {
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
      <img :src="product.image" class="mx-auto h-20 w-20 object-cover" />
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
      <span v-else @click="toggleModal(product.id)">更新</span>
    </td>
  </tr>
</template>
