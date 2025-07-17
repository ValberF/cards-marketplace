import { ref } from 'vue'
import type { Ref } from 'vue'
import axios, { AxiosError } from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth'

const api: AxiosInstance = axios.create({
  baseURL: 'https://cards-marketplace-api-2fjj.onrender.com',
  timeout: 10000,
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authStore = useAuthStore()
    const token = authStore.token
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(error)
)

export function useApi() {
  const loading: Ref<boolean> = ref(false)
  const error: Ref<Error | AxiosError | null> = ref(null)

  const get = async <T = unknown>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
    loading.value = true
    error.value = null
    try {
      const response: AxiosResponse<T> = await api.get(url, config)
      return response.data
    } catch (err) {
      if (err instanceof Error) {
        error.value = err
      } else {
        error.value = new Error('Unknown error')
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  const post = async <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config: AxiosRequestConfig = {}
  ): Promise<T> => {
    loading.value = true
    error.value = null
    try {
      const response: AxiosResponse<T> = await api.post(url, data, config)
      return response.data
    } catch (err) {
      if (err instanceof Error) {
        error.value = err
      } else {
        error.value = new Error('Unknown error')
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  const del = async <T = unknown>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
    loading.value = true
    error.value = null
    try {
      const response: AxiosResponse<T> = await api.delete(url, config)
      return response.data
    } catch (err) {
      if (err instanceof Error) {
        error.value = err
      } else {
        error.value = new Error('Unknown error')
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    get,
    post,
    del,
    loading,
    error,
    api,
  }
}