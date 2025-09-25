import { request } from '@/utils/request'
import type { Dashboard, Dept, LoginType, Menu, Result, ResultData, User } from '@/types/api'

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
// 获取权限列表
export const getPermissionList = () => {
  return request.get<{ buttonList: string[]; menuList: Menu.MenuItem[] }>('/user/getPermissionList')
}
// 获取工作台报表汇总数据
export const getReportData = () => {
  return request.post<Dashboard.ReportData>('/dashboard/reportData', {})
}
// 获取工作台折线图数据
export const getLineData = () => {
  return request.post<Dashboard.LineData>('/dashboard/lineData', {})
}
// 获取工作台饼图数据
export const getPieData = () => {
  return request.post<Dashboard.PieData[]>('/dashboard/pieData', {})
}
export const getPieData2 = () => {
  return request.post<Dashboard.PieData[]>('/dashboard/pieData2', {})
}
// 获取工作台雷达图数据
export const getRadarData = () => {
  return request.post<Dashboard.RadarData>('/dashboard/radarData', {})
}

// 获取用户列表
export const getUserList = (params?: User.params) => {
  return request.post<ResultData<User.UserItem>>('/user/list', params)
}

// 创建用户
export const createUser = (params: User.UserItem) => {
  return request.post<User.UserItem>('/user/create', params)
}

// 更新用户
export const updateUser = (params: User.UserItem) => {
  return request.post<User.UserItem>('/user/update', params)
}

// 批量删除
export const deleteUser = (params: { ids: Array<string | number> }) => {
  return request.post<User.UserItem>('/user/delete', params)
}

// 获取部门管理
export const getDeptList = (params?: Dept.params) => {
  return request.post<ResultData<Dept.DeptItem>>('/dept/list', params)
}

// 菜单管理
export const getMenuList = (params?: Menu.Params) => {
  return request.post<Menu.MenuItem[]>('/menu/list', params)
}

// 创建菜单
export const createMenu = (params: Menu.CreateParams) => {
  return request.post('/menu/create', params)
}

// 更新菜单
export const updateMenu = (params: Menu.EditParams) => {
  return request.post('/menu/update', params)
}

// 删除菜单
export const deleteMenu = (params: Menu.DeleteParams) => {
  return request.post('/menu/delete', params)
}
