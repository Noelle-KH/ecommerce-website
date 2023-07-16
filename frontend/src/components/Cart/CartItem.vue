<script setup>
import { computed, reactive } from 'vue'
import DeleteIcon from '../icons/DeleteIcon.vue'
import MinusIcon from '../icons/MinusIcon.vue'
import PlusIcon from '../icons/PlusIcon.vue'

const props = defineProps(['cartItemData'])
const cartItem = reactive(props.cartItemData)
const total = computed(() => {
  return cartItem.amount * cartItem.product.price
})

const handleMinusAmount = () => {
  if (cartItem.amount < 2) {
    return
  }
  cartItem.amount = cartItem.amount - 1
}

const handlePlusAmount = () => {
  if (cartItem.amount > cartItem.product.stock) {
    return
  }
  cartItem.amount = cartItem.amount + 1
}
</script>

<template>
  <tr class="border border-orange-400 text-center">
    <td>
      <DeleteIcon class="mx-auto h-5 w-5 cursor-pointer hover:text-stone-600" />
    </td>
    <td>
      <img
        :src="cartItem.product.image"
        class="mx-auto w-20"
        :alt="cartItem.product.name"
      />
    </td>
    <td>
      {{ cartItem.product.name }}
    </td>
    <td>NT$ {{ cartItem.product.price }}</td>
    <td>
      <div class="flex items-center justify-center">
        <MinusIcon
          class="h-5 w-5 cursor-pointer select-none hover:text-stone-500"
          @click="handleMinusAmount"
        />
        <input
          class="mx-1 w-10 cursor-pointer border border-stone-600 text-center"
          v-model="cartItem.amount"
        />
        <PlusIcon
          class="h-5 w-5 cursor-pointer select-none hover:text-stone-500"
          @click="handlePlusAmount"
        />
      </div>
    </td>
    <td class="md:w-36">NT$ {{ total }}</td>
  </tr>
</template>
