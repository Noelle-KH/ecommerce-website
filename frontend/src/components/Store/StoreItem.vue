<script setup>
import Swal from 'sweetalert2'
import DeleteIcon from '../icons/DeleteIcon.vue'
import PutOnIcon from '../icons/PutOnIcon.vue'
import TackOffIcon from '../icons/TackOffIcon.vue'

const props = defineProps(['active', 'product'])
const emits = defineEmits(['toggleActive', 'deleteProduct'])

const handleDeleteProduct = (id) => {
  Swal.fire({
    icon: 'warning',
    title: '確定要刪除商品嗎?',
    showCancelButton: true,
    confirmButtonText: '確定',
    cancelButtonText: '取消'
  }).then((result) => {
    if (result.isConfirmed) {
      return emits('deleteProduct', id)
    }
    return
  })
}

const handleToggleActive = (id) => {
  emits('toggleActive', id, props.active)
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
        @click="handleToggleActive(product.id)"
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
        @click="handleToggleActive(product.id)"
      />
      <span v-else>更新</span>
    </td>
  </tr>
</template>
