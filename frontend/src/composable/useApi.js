import { axiosInstance, axiosAuthInstance } from '../util/axios'

export const useApi = () => {
  const login = async (role, data) => {
    try {
      const response = await axiosInstance.post(`/login?role=${role}`, data)

      const { message } = response.data

      return { ...response.data.data, message }
    } catch (error) {
      throw error.response.data
    }
  }

  const register = async (data) => {
    try {
      const response = await axiosInstance.post('/register', data)

      return response.data
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
        query = `?min=${filter.min}&max=${filter.max}&orderBy=${filter.orderBy}`
      } else if (filter.keyword) {
        query = `?keyword=${filter.keyword}&orderBy=${filter.orderBy}`
      } else if (filter.categoryId) {
        query = `?categoryId=${filter.categoryId}&orderBy=${filter.orderBy}`
      } else {
        query = `?orderBy=${filter.orderBy}`
      }

      if (active === false) {
        query = `?active=${active}&orderBy=${filter.orderBy}`
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

  const updateStoreProduct = async (id, product) => {
    try {
      const response = await axiosAuthInstance.put(
        `/products/${id}`,
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
    register,
    getAllCategory,
    getAllProduct,
    getProduct,
    addStoreProduct,
    updateStoreProduct,
    updateProductStatus,
    deleteStoreProduct,
    getAllCartItem,
    addCartItem,
    updateCartItemAmount,
    deleteCartItem,
    updateCartStatus
  }
}
