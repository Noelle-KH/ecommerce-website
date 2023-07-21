<script setup>
import { computed } from 'vue'
import { useCartStore } from '../../stores/cart'
import { useAlert } from '../../composable/useAlert'
import DeleteIcon from '../icons/DeleteIcon.vue'
import MinusIcon from '../icons/MinusIcon.vue'
import PlusIcon from '../icons/PlusIcon.vue'

const props = defineProps(['cartItem'])
const cartStore = useCartStore()
const { updateAmount, setAmount, removeCartItem } = cartStore
const { showAlert } = useAlert()
const total = computed(() => {
  return props.cartItem.amount * props.cartItem.product.price
})

const handleRemoveCartItem = (id) => {
  showAlert('warning', '確定要刪除商品嗎?', true).then((result) => {
    if (result.isConfirmed) {
      return removeCartItem(id)
    }
    return
  })
}
</script>

<template>
  <tr class="border border-orange-400 text-center">
    <td>
      <DeleteIcon
        class="mx-auto h-5 w-5 cursor-pointer hover:text-stone-600"
        @click="handleRemoveCartItem(cartItem.id)"
      />
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
          @click="updateAmount(cartItem.id, '-')"
        />
        <input
          type="text"
          class="mx-1 w-10 cursor-pointer border border-stone-600 text-center"
          :value="cartItem.amount"
          @blur="(event) => setAmount(cartItem.id, Number(event.target.value))"
        />
        <PlusIcon
          class="h-5 w-5 cursor-pointer select-none hover:text-stone-500"
          @click="updateAmount(cartItem.id, '+')"
        />
      </div>
    </td>
    <td class="md:w-36">NT$ {{ total }}</td>
  </tr>
</template>
