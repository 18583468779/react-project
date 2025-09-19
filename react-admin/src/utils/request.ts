import { message } from 'antd'
import axios from 'axios'
import { hideLoading, showLoading } from './loading'
import { getItem, removeItem } from './storage'
import type { Result } from '@/types/api'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000,
  timeoutErrorMessage: '请求超时，请稍后重试',
  withCredentials: true
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    showLoading()
    const token = getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    if (import.meta.env.VITE_MOCK_SWITCH === 'true') {
      // mock数据开启
      config.baseURL = import.meta.env.VITE_MOCK_API
    } else {
      // 生产环境
      config.baseURL = import.meta.env.VITE_BASE_API
    }
    return { ...config }
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
instance.interceptors.response.use(
  response => {
    hideLoading()
    const res: Result = response.data
    if (res.code === 500001) {
      message.error(res.msg)
      removeItem('token')
      window.location.href = '/login'
      return res
    } else if (res.code != 0) {
      message.error(res.msg)
      return Promise.reject(res)
    }
    return res.data
  },
  error => {
    hideLoading()
    if (error.response.status === 401) {
      // 处理未授权错误，例如跳转到登录页
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const request = {
  get<T>(url: string, params?: object): Promise<T> {
    return instance.get<T>(url, { params })
  },
  post<T>(url: string, data?: object): Promise<T> {
    return instance.post<T>(url, data)
  },
  put<T>(url: string, data?: object): Promise<T> {
    return instance.put<T>(url, data)
  },
  delete<T>(url: string, params?: object): Promise<T> {
    return instance.delete<T>(url, { params })
  }
}
