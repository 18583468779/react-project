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

// 菜单管理
export namespace Menu {
  export interface Params {
    menuName: string
    menuState: number
  }
  // 菜单创建
  export interface CreateParams {
    menuName: string // 菜单名称
    icon?: string // 图标
    menuType: number // 菜单类型 1：菜单 2：按钮 3：页面
    menuState: number // 1: 正常 2：停用
    menuCode?: string // 按钮权限表示
    parentId?: string // 父菜单id
    path?: string // 路由地址
    component?: string // 组件路径
  }
  // 菜单详情
  export interface MenuItem extends CreateParams {
    _id: string
    createTime: string
    buttons?: MenuItem[] // 按钮列表
    children: MenuItem[] // 子菜单列表
  }

  export interface EditParams extends CreateParams {
    _id?: string
  }

  export interface DeleteParams {
    _id: string
  }
}

// 角色管理
export namespace Role {
  export interface Params extends PageParams {
    roleName?: string
  }
  export interface CreateParams {
    roleName: string
    remark?: string
  }
  export interface RoleItem extends CreateParams {
    _id: string
    permissionList: {
      checkedKeys: string[] // 选中的权限
      halfCheckedKeys: string[] // 半选中的权限
    }
    updateTime: string
    createTime: string
  }
  export interface EditParams extends CreateParams {
    _id: string
  }
  export interface Permission {
    _id: string
    permissionList: {
      checkedKeys: string[]
      halfCheckedKeys: string[]
    }
  }
}
