// 工具函数

import type { Menu } from '@/types/api'

/**
 * 格式化数字为货币格式
 * @param num 数字或字符串类型的数字
 * @returns 格式化后的货币字符串
 */
export const formatMoney = (num: number | string) => {
  const a = parseFloat(num.toString())

  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}

/**
 *
 * 格式化数字
 * @param num 数字或字符串类型的数字
 * @returns 格式化后的数字字符串
 */
export const formatNum = (num?: number | string) => {
  if (!num) return 0
  const a = num.toString()
  if (a.indexOf('.') > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return a.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

/**
 * 格式化日期为本地日期字符串
 * @param date 日期对象
 * @returns 格式化后的本地日期字符串
 */
export const toLocalDate = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) curDate = date
  if (rule === 'yyyy-MM-dd') {
    return curDate.toLocaleDateString('zh-CN').replace(/\//g, '-')
  }
  if (rule === 'HH:mm:ss') {
    return curDate.toLocaleTimeString('zh-CN')
  }
  return curDate.toLocaleString('zh-CN').replace(/\//g, '-')
}

// 用户状态转换
export const formatState = (state: number) => {
  if (state === 1) return '在职'
  if (state === 2) return '试用期'
  if (state === 3) return '离职'
}

// 获取菜单权限路径
export const getMenuPath = (list: Menu.MenuItem[]): string[] => {
  return list.reduce((result: string[], item: Menu.MenuItem) => {
    return result.concat(Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path + '')
  }, [])
}

// 递归获取路由对象
export const searchRoute: any = (path: string, routes: any = []) => {
  for (const item of routes) {
    if (item.path === path) return item
    if (item.children) {
      const result = searchRoute(path, item.children)
      if (result) return result
    }
  }
  return ''
}
