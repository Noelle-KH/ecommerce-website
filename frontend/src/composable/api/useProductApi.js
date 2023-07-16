import { axiosInstance } from '../../util/axios'

export const getAllProduct = async (filter = '', active = true) => {
	try {
		let query = ''
		if (filter.min >= 0 && filter.max >= 0) {
			query = `?min=${filter.min}&max=${filter.max}`
		} else if (filter.keyword) {
			query = `?keyword=${filter.keyword}`
		}

		console.log(active)
		if (active === false) {
			query = `?active=${active}`
		}

		const response = await axiosInstance.get(`/products${query}`)

		return response.data.data
	} catch (error) {
		return error.response.data
	}
}
