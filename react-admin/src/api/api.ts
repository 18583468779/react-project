import { request } from '@/utils/request'
import type { Dashboard, LoginType, Result, User } from '@/types/api'

export const login = (params: LoginType.params) => {
  return request.post<{ token: string }>('/login', params, { showLoading: false, showError: true })
}
// mock 登录失败
export const loginError = (params: LoginType.params) => {
  return request.post<{ token: string }>('/loginError', params, { showLoading: false, showError: true })
}
// 模拟获取用户信息
export const userInfo = () => {
  return request.post<User.UserItem>('/userInfo', {})
}

// 获取工作台报表汇总数据
export const getReportData = () => {
  return request.post<Dashboard.ReportData>('/dashboard/reportData', {})
}
