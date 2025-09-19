import { request } from '@/utils/request'
import type { LoginType, Result } from '@/types/api'

export const login = (params: LoginType.params) => {
  return request.post<{ token: string }>('/login', params)
}
