// 接口类型定义
export interface Result<T = any> {
  code: number
  data: T
  msg: string
}

export interface ResultData<T = any> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number
  }
}
// 分页参数
export interface PageParams {
  pageNum: number
  pageSize?: number
}
// 登录
export namespace LoginType {
  export interface params {
    username: string
    password: string
  }
}
// 用户管理
export namespace User {
  export interface params extends PageParams {
    userId?: number
    userName?: string
    state?: number
  }
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
    userImg: string
  }
}
// 部门管理
export namespace Dept {
  export interface params extends PageParams {
    deptName?: string
  }
  export interface CreateParams {
    deptName: string
    parentId?: string
    userName: string
  }
  export interface EditParams extends CreateParams {
    _id: string
  }
  export interface DeptItem {
    _id: string
    createTime: string
    updateTime: string
    deptName: string
    userName: string
    children: DeptItem[]
  }
}

// 菜单管理
export namespace Menu {}
export namespace Dashboard {
  export interface ReportData {
    driverCount: number
    totalMoney: number
    orderCount: number
    cityNum: number
  }
  export interface LineData {
    label: string[]
    order: number[]
    money: number[]
  }
  export interface PieData {
    value: number
    name: string
  }
  export interface RadarData {
    indicator: Array<{ name: string; max: number }>
    data: {
      name: string
      value: number[]
    }
  }
}
