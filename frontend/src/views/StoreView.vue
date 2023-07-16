<script setup>
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AddItemModal from '../components/Store/AddItemModal.vue'
import StoreList from '../components/Store/StoreList.vue'
import { getAllProduct } from '../composable/api/useProductApi'

const props = defineProps(['isAuthenticate', 'role'])
const router = useRouter()

const showAddItemModal = ref(false)
const activeProducts = ref([])
const nonActiveProducts = ref([])
const isLoading = ref(false)
const errorMessage = ref(null)

onMounted(async () => {
  try {
    if (!props.isAuthenticate || props.role !== 'seller') {
      Swal.fire({
        icon: 'error',
        title: '沒有使用該頁面的權限'
      })
      return router.replace({ name: 'HomeView' })
    }

    isLoading.value = true
    const activeData = await getAllProduct()
    const nonActiveData = await getAllProduct('', false)
    activeProducts.value = activeData.products
    nonActiveProducts.value = nonActiveData.products
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
})

const handleShowModal = (type) => {
  showAddItemModal.value = type
}

const toggleProductData = (id, originPosition, newPosition) => {
  const product = originPosition.value.find((product) => product.id === id)
  originPosition.value = originPosition.value
    .map((product) =>
      product.id === id ? { ...product, active: !product.active } : product
    )
    .filter((product) => product.id !== id)

  console.log(originPosition.value)

  newPosition.value = [
    ...newPosition.value,
    { ...product, active: !product.active }
  ]
}

const handleToggleActive = (id, active) => {
  if (active) {
    toggleProductData(id, activeProducts, nonActiveProducts)
  } else {
    toggleProductData(id, nonActiveProducts, activeProducts)
  }
}

const handleDeleteProduct = (id) => {
  nonActiveProducts.value = nonActiveProducts.value.filter(
    (product) => product.id !== id
  )
}
</script>

<template>
  <main class="px-10 py-12">
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p v-if="isLoading && !errorMessage">loading</p>
    <div
      v-if="Array.isArray(activeProducts) && Array.isArray(nonActiveProducts)"
    >
      <AddItemModal v-if="showAddItemModal" @closeModal="handleShowModal" />
      <StoreList
        :active="true"
        :productsData="activeProducts"
        @openModal="handleShowModal"
        @toggleActive="handleToggleActive"
        @deleteProduct="handleDeleteProduct"
      />
      <StoreList
        :active="false"
        :productsData="nonActiveProducts"
        @toggleActive="handleToggleActive"
        @deleteProduct="handleDeleteProduct"
      />
    </div>
  </main>
</template>
