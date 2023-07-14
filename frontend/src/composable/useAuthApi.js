import { axiosInstance } from '../util/axios'

export const login = async (role, account, password) => {
	try {
		const response = await axiosInstance.post(`/login?role=${role}`, {
			account,
			password
		})
		const { message } = response.data

		return { ...response.data.data, message }
	} catch (error) {
		console.log(error)
		return error.response.data
	}
}
