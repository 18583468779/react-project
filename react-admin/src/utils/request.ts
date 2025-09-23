import axios from 'axios'
import { hideLoading, showLoading } from './loading'
import { getItem, removeItem } from './storage'
import type { Result } from '@/types/api'
import { message } from './antdGlobal'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000,
  timeoutErrorMessage: '请求超时，请稍后重试',
  withCredentials: true
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    if (config.showLoading) {
      // 自定义配置是否展示loading
      showLoading()
    }
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
    if (res.code === 401) {
      message.error(res.msg)
      removeItem('token')
      window.location.href = '/login'
      return res
    } else if (res.code != 0) {
      if (response.config.showError) {
        // 自定义配置是否展示错误信息
        message.error(res.msg)
      }
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

interface IConfig {
  // 自定义配置全局请求loading
  showLoading?: boolean
  showError?: boolean
}

export const request = {
  get<T>(url: string, params?: object, config: IConfig = { showLoading: true, showError: true }) {
    return instance.get<T>(url, { params, ...config }) as Promise<T>
  },
  post<T>(url: string, data?: object, config: IConfig = { showLoading: true, showError: true }) {
    return instance.post<T>(url, data, config) as Promise<T>
  },
  put<T>(url: string, data?: object) {
    return instance.put<T>(url, data) as Promise<T>
  },
  delete<T>(url: string, params?: object) {
    return instance.delete<T>(url, { params }) as Promise<T>
  }
}
