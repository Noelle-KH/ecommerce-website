import { axiosInstance, axiosAuthInstance } from '../util/axios'

const useApi = () => {
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

      return response.data.data
    } catch (error) {
      throw error.response.data
    }
  }

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get('/categories')
      return response.data.data
    } catch (error) {
      throw error.response.data
    }
  }

  const getCartItems = async () => {
    try {
      const response = await axiosAuthInstance.get('/carts')

      return response.data.data
    } catch (error) {
      throw error.response.data
    }
  }

  const addProduct = async (product) => {
    try {
      const response = await axiosAuthInstance.post(
        '/products',
        { ...product },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      const { message } = response.data

      return { ...response.data.data, message }
    } catch (error) {
      throw error.response.data
    }
  }

  return { login, getAllProduct, addProduct, getCartItems, getCategories }
}

export default useApi
