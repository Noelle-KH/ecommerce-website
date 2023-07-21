import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import useApi from '../composable/useApi'

export const useProductStore = defineStore('product', () => {
  const router = useRouter()
  const { getAllProduct, getAllCategory } = useApi()
  const products = ref([])
  const searchQuery = ref('')
  const searchResult = ref(null)
  const categories = ref([])
  const isLoading = ref(false)
  const errorMessage = ref(null)

  const getProducts = async (filterQuery) => {
    try {
      isLoading.value = true
      if (filterQuery) {
        searchResult.value = await getAllProduct(true, filterQuery)
      }
      products.value = await getAllProduct(true)
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  const getCategories = async () => {
    try {
      const categoriesData = await getAllCategory()
      categories.value = categoriesData
    } catch (error) {
      console.error(error)
    }
  }

  const setSearchResult = (searchType) => {
    if (searchType === 'keyword') {
      if (!searchQuery.value) {
        searchResult.value = null
        return router.replace({ name: 'HomeView' })
      }
      searchResult.value = products.value.filter((product) =>
        product.name.includes(searchQuery.value)
      )
      router.replace({
        name: 'SearchView',
        query: { keyword: searchQuery.value }
      })
    } else if (searchType === 'amount') {
      searchResult.value = products.value.filter(
        (product) =>
          product.price <= searchQuery.value.max &&
          product.price >= searchQuery.value.min
      )
      router.replace({
        name: 'SearchView',
        query: searchQuery.value
      })
      searchQuery.value = ''
    } else if (searchType === 'category') {
      searchResult.value = products.value.filter(
        (product) => product.category.id === searchQuery.value.categoryId
      )
      router.replace({
        name: 'SearchView',
        query: searchQuery.value
      })
      searchQuery.value = ''
    }
  }

  return {
    isLoading,
    products,
    searchQuery,
    searchResult,
    categories,
    errorMessage,
    getProducts,
    getCategories,
    setSearchResult
  }
})
