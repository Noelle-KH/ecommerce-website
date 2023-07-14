import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL

export const axiosInstance = axios.create({
	baseURL
})

export const axiosAuthInstance = axios.create({
	baseURL
})

axiosAuthInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token')
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		console.log(error)
	}
)
