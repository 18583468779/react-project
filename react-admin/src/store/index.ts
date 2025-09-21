import type { User } from '@/types/api'
import { create } from 'zustand'

export const userStore = create<{
  token: string
  updateToken: (token: string) => void
  collapsed: boolean
  updateCollapsed: () => void
  userInfo: User.UserItem
  updateUserInfo: (userInfo: User.UserItem) => void
}>(set => {
  return {
    token: '',
    updateToken: token => set({ token }),
    collapsed: false,
    updateCollapsed: () =>
      set(state => {
        return {
          collapsed: !state.collapsed
        }
      }),
    userInfo: {
      _id: '',
      userId: 0,
      userName: '',
      userEmail: '',
      deptId: '',
      state: 0,
      mobile: '',
      job: '',
      role: 0,
      roleList: '',
      createId: 0,
      deptName: '',
      userImg: ''
    },
    updateUserInfo: (userInfo: User.UserItem) => {
      set({
        userInfo
      })
    }
  }
})
