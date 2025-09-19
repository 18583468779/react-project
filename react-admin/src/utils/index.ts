// 工具函数

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
