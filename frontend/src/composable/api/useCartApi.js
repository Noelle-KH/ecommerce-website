import { axiosAuthInstance } from '../../util/axios'

export const getCartItems = async () => {
  try {
    const response = await axiosAuthInstance.get('/carts')

    return response.data.data
  } catch (error) {
    return error.response.data
  }
}
