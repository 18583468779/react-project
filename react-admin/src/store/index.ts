import type { User } from '@/types/api'
import { create } from 'zustand'

export const userBearStore = create<{
  token: string
  userInfo: {
    userEmail: string
    userName: string
  }
  updateUserInfo: (userInfo: User.UserItem) => void
}>(set => {
  return {
    token: '',
    userInfo: {
      userEmail: '',
      userName: ''
    },
    updateUserInfo: (userInfo: User.UserItem) => {
      set({
        userInfo
      })
    }
  }
})
