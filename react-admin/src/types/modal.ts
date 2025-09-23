import type { RefObject } from 'react'
export type IAction = 'create' | 'update' | 'delete'
export enum IActionData {
  Create = 'create',
  Update = 'update',
  Delete = 'delete'
}

export interface IModalProp<T> {
  mRef: RefObject<{ open: (type: IAction, data: T) => void } | undefined>
  update: () => void
}
