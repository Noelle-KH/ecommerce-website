import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '../composable/useApi'
import { useAlert } from '../composable/useAlert'

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
  const {
    getAllProduct,
    updateProductStatus,
    deleteStoreProduct,
    addStoreProduct,
    updateStoreProduct
  } = useApi()
  const { showAlert } = useAlert()
  const showItemModal = ref(false)
  const activeProducts = ref([])
  const nonActiveProducts = ref([])
  const isLoading = ref(false)
  const errorMessage = ref(null)
  const modalType = ref('addItem')
  const initialCategory = ref(null)
  const updateProduct = ref(null)

  const formData = ref({
    name: '',
    description: '',
    image: '',
    categoryId: '',
    price: '',
    stock: ''
  })
  const formError = ref({
    name: null,
    description: null,
    image: null,
    categoryId: null,
    price: null,
    stock: null
  })

  const getStoreProducts = async (active = true) => {
    try {
      isLoading.value = true
      if (active) {
        activeProducts.value = await getAllProduct(active)
      } else {
        nonActiveProducts.value = await getAllProduct(active)
      }
    } catch (error) {
      throw error.message
    } finally {
      isLoading.value = false
    }
  }

  const addOrUpdateProduct = async () => {
    try {
      if (modalType.value === 'addItem') {
        const { product, message } = await addStoreProduct(formData.value)

        if (product) {
          showAlert('success', message).then(() => {
            activeProducts.value = [product, ...activeProducts.value]
            toggleModal()
          })
        }
      } else {
        const { product, message } = await updateStoreProduct(
          updateProduct.value.id,
          formData.value
        )

        if (product) {
          showAlert('success', message).then(() => {
            activeProducts.value = activeProducts.value.map((activeProduct) =>
              activeProduct.id === product.id ? product : activeProduct
            )
            toggleModal()
          })
        }
      }
    } catch (error) {
      throw { code: error.code, message: error.message }
    }
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

  const toggleModal = (id) => {
    showItemModal.value = !showItemModal.value

    Object.keys(formError.value).forEach(
      (fieldName) => (formError.value[fieldName] = null)
    )

    if (showItemModal.value && id) {
      modalType.value = 'updateItem'
      updateProduct.value = activeProducts.value.find(
        (product) => product.id === id
      )

      Object.keys(formData.value).forEach((fieldName) =>
        fieldName === 'categoryId'
          ? (formData.value[fieldName] = updateProduct.value.category.id)
          : (formData.value[fieldName] = updateProduct.value[fieldName])
      )
    } else {
      modalType.value = 'addItem'
      Object.keys(formData.value).forEach((fieldName) =>
        fieldName === 'categoryId'
          ? (formData.value[fieldName] = initialCategory)
          : (formData.value[fieldName] = null)
      )
    }
  }

  return {
    isLoading,
    modalType,
    formData,
    formError,
    initialCategory,
    showItemModal,
    activeProducts,
    nonActiveProducts,
    errorMessage,
    addOrUpdateProduct,
    getStoreProducts,
    toggleActive,
    deleteProduct,
    toggleModal
  }
})
