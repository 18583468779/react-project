import { request } from '@/utils/request'
import type { LoginType, Result, User } from '@/types/api'

export const login = (params: LoginType.params) => {
  return request.post<{ token: string }>('/login', params, { showLoading: false, showError: true })
}
// mock 登录失败
export const loginError = (params: LoginType.params) => {
  return request.post<{ token: string }>('/loginError', params, { showLoading: false, showError: true })
}

export const userInfo = () => {
  return request.post<User.UserItem>('/userInfo', {})
}
