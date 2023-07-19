import { ref } from 'vue'
import { defineStore } from 'pinia'
import useApi from '../composable/useApi'

export const useProductStore = defineStore('product', () => {
  const { getAllProduct, getAllCategory } = useApi()
  const products = ref([])
  const categories = ref([])
  const isLoading = ref(false)
  const errorMessage = ref(null)

  const getProducts = async (filterQuery = {}) => {
    try {
      isLoading.value = true
      const productsData = await getAllProduct(true, filterQuery)
      products.value = productsData
    } catch (error) {
      errorMessage.value = error.message
    } finally {
      isLoading.value = false
    }
  }

  const getCategories = async () => {
    try {
      const categoriesData = await getAllCategory()
      categories.value = categoriesData
    } catch (error) {
      errorMessage.value = error.message
    }
  }

  return {
    isLoading,
    products,
    categories,
    errorMessage,
    getProducts,
    getCategories
  }
})
