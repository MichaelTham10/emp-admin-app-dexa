import axios, { AxiosInstance } from 'axios'

export const AxiosFetcher = (baseURL: string): AxiosInstance => {
    const instance = axios.create({
        baseURL,
        headers: { 'Content-Type': 'application/json' },
    })

    instance.interceptors.request.use(async (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    })

    instance.interceptors.response.use(
        async (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                localStorage.removeItem('token')
                window.location.href = '/login'
            }
            throw error
        }
    )

    return instance
}