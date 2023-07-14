import { axiosInstance } from '../../util/axios'

export const getAllProduct = async () => {
	try {
		const response = await axiosInstance.get('/products')
		return response.data.data
	} catch (error) {
		return error.response.data
	}
}
