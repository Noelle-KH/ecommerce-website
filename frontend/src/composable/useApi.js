import { axiosInstance, axiosAuthInstance } from '../util/axios'

export const useApi = () => {
  const login = async (role, account, password) => {
    try {
      const response = await axiosInstance.post(`/login?role=${role}`, {
        account,
        password
      })

      const { message } = response.data

      return { ...response.data.data, message }
    } catch (error) {
      throw error.response.data
    }
  }

  const getAllCategory = async () => {
    try {
      const response = await axiosInstance.get('/categories')
      return response.data.data.categories
    } catch (error) {
      throw error.response.data
    }
  }

  const getAllProduct = async (active = true, filter = '') => {
    try {
      let query = ''
      if (filter.min >= 0 && filter.max >= 0) {
        query = `?min=${filter.min}&max=${filter.max}`
      } else if (filter.keyword) {
        query = `?keyword=${filter.keyword}`
      } else if (filter.categoryId) {
        query = `?categoryId=${filter.categoryId}`
      }

      if (active === false) {
        query = `?active=${active}`
      }

      const response = await axiosInstance.get(`/products${query}`)

      return response.data.data.products
    } catch (error) {
      throw error.response.data
    }
  }

  const getProduct = async (id) => {
    try {
      const response = await axiosInstance.get(`/products/${id}`)

      return response.data.data.product
    } catch (error) {
      throw error.response.data
    }
  }

  const addStoreProduct = async (product) => {
    try {
      const response = await axiosAuthInstance.post(
        '/products',
        { ...product },
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      const { message } = response.data

      return { ...response.data.data, message }
    } catch (error) {
      throw error.response.data
    }
  }

  const updateProductStatus = async (id, active) => {
    try {
      const response = await axiosAuthInstance.patch(
        `/products/${id}?active=${active}`
      )

      return response.data.message
    } catch (error) {
      throw error.response.data
    }
  }

  const deleteStoreProduct = async (id) => {
    try {
      const response = await axiosAuthInstance.delete(`/products/${id}`)

      return response.data.message
    } catch (error) {
      throw error.response.data
    }
  }

  const getAllCartItem = async () => {
    try {
      const response = await axiosAuthInstance.get('/carts')

      return response.data.data.cart.cartItem
    } catch (error) {
      throw error.response.data
    }
  }

  const addCartItem = async (cartId, productId) => {
    try {
      const response = await axiosAuthInstance.post(
        '/carts',
        { cartId, productId },
        { headers: { 'Content-Type': 'application/json' } }
      )

      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  const updateCartItemAmount = async (cartItemId, amount) => {
    try {
      const response = await axiosAuthInstance.patch(
        `/carts/${cartItemId}`,
        { amount },
        { headers: { 'Content-Type': 'application/json' } }
      )

      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  const deleteCartItem = async (cartItemId) => {
    try {
      const response = await axiosAuthInstance.delete(`/carts/${cartItemId}`)

      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  const updateCartStatus = async () => {
    try {
      const response = await axiosAuthInstance.patch('/carts')

      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  return {
    login,
    getAllCategory,
    getAllProduct,
    getProduct,
    addStoreProduct,
    updateProductStatus,
    deleteStoreProduct,
    getAllCartItem,
    addCartItem,
    updateCartItemAmount,
    deleteCartItem,
    updateCartStatus
  }
}
