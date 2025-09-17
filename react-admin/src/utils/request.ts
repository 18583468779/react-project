import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  timeoutErrorMessage: '请求超时，请稍后重试',
  withCredentials: true
})

export default {
  get(url: string, params?: any) {
    return instance.get(url, { params })
  },
  post(url: string, data?: any) {
    return instance.post(url, data)
  },
  put(url: string, data?: any) {
    return instance.put(url, data)
  },
  delete(url: string, params?: any) {
    return instance.delete(url, { params })
  }
}
