import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '../composable/useApi'

const toggleData = (id, originPosition, newPosition) => {
  const product = originPosition.value.find((product) => product.id === id)
  originPosition.value = originPosition.value
    .map((product) =>
      product.id === id ? { ...product, active: !product.active } : product
    )
    .filter((product) => product.id !== id)

  newPosition.value = [
    { ...product, active: !product.active },
    ...newPosition.value
  ]
}

export const useStoreStore = defineStore('store', () => {
  const { getAllProduct, updateProductStatus, deleteStoreProduct } = useApi()
  const showAddItemModal = ref(false)
  const activeProducts = ref([])
  const nonActiveProducts = ref([])
  const isLoading = ref(false)
  const errorMessage = ref(null)

  const getStoreProducts = async (active = true) => {
    try {
      isLoading.value = true
      if (active) {
        activeProducts.value = await getAllProduct(active)
      } else {
        nonActiveProducts.value = await getAllProduct(active)
      }
    } catch (error) {
      errorMessage.value = error.message
    } finally {
      isLoading.value = false
    }
  }

  const addNewProduct = (product) => {
    activeProducts.value = [product, ...activeProducts.value]
  }

  const toggleActive = async (id, active) => {
    try {
      await updateProductStatus(id, !active)
      if (active) {
        toggleData(id, activeProducts, nonActiveProducts)
      } else {
        toggleData(id, nonActiveProducts, activeProducts)
      }
    } catch (error) {
      errorMessage.value = error.message
    }
  }

  const deleteProduct = async (id) => {
    try {
      await deleteStoreProduct(id)
      nonActiveProducts.value = nonActiveProducts.value.filter(
        (product) => product.id !== id
      )
    } catch (error) {
      errorMessage.value = error.message
    }
  }

  const toggleModal = () => {
    showAddItemModal.value = !showAddItemModal.value
  }

  return {
    isLoading,
    showAddItemModal,
    activeProducts,
    nonActiveProducts,
    errorMessage,
    addNewProduct,
    getStoreProducts,
    toggleActive,
    deleteProduct,
    toggleModal
  }
})
