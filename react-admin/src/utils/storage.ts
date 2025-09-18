// 类型定义
type StorageValue<T> = {
  value: T
  expireTime: number | null
}

// 设置带过期时间的本地存储
const setItem = <T>(key: string, value: T, expire?: number): void => {
  const storageValue: StorageValue<T> = {
    value,
    expireTime: expire ? Date.now() + expire : null
  }
  localStorage.setItem(key, JSON.stringify(storageValue))
}

// 获取带过期时间验证的本地存储
const getItem = <T>(key: string, defaultValue?: T): T | undefined => {
  const item = localStorage.getItem(key)

  if (item === null) return defaultValue

  try {
    const parsed = JSON.parse(item) as StorageValue<T>

    // 检查是否过期
    if (parsed.expireTime && Date.now() > parsed.expireTime) {
      localStorage.removeItem(key)
      return defaultValue
    }

    return parsed.value
  } catch {
    return defaultValue
  }
}

// 删除本地存储项
const removeItem = (key: string): void => {
  localStorage.removeItem(key)
}

// 清空所有本地存储
const clear = (): void => {
  localStorage.clear()
}

// 检查键是否存在
const hasKey = (key: string): boolean => {
  return localStorage.getItem(key) !== null
}

export { setItem, getItem, removeItem, clear, hasKey }
