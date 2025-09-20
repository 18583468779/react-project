// 接口类型定义
export interface Result<T = any> {
  code: number
  data: T
  msg: string
}

export namespace LoginType {
  export interface params {
    username: string
    password: string
  }
}
export namespace User {
  export interface UserItem {
    _id: string
    userId: number
    userName: string
    userEmail: string
    deptId: string
    state: number
    mobile: string
    job: string
    role: number
    roleList: string
    createId: number
  }
}
