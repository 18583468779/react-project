import type { RefObject } from 'react'
import type { User } from './api'
export type IAction = 'create' | 'update' | 'delete'
export enum IActionData {
  Create = 'create',
  Update = 'update',
  Delete = 'delete'
}

export interface IModalProp {
  mRef: RefObject<{ open: (type: IAction, data: User.UserItem) => void } | undefined>
  update: () => void
}
