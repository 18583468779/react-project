// 角色相关 Mock 配置（可添加到你的 mock.ts 文件中）

import type { Role } from '@/types/api'
import { v4 as uuidv4 } from 'uuid'
import type { MockMethod } from 'vite-plugin-mock'

// 全局角色数据存储
let roleDatabase: Role.RoleItem[] = []

// 生成随机角色数据
const generateRandomRole = (id: string): Role.RoleItem => {
  const roleNames = ['超级管理员', '系统管理员', '部门主管', '普通员工', '访客']
  const remarks = ['拥有系统全部权限', '负责系统配置和用户管理', '管理部门内员工和数据', '基础操作权限', '仅查看权限']

  const now = new Date().toISOString().slice(0, 19).replace('T', ' ')
  const randomIdx = Math.floor(Math.random() * roleNames.length)

  return {
    _id: id,
    roleName: roleNames[randomIdx],
    remark: remarks[randomIdx],
    permissionList: {
      checkedKeys: [], // 初始为空，可通过设置权限接口添加
      halfCheckedKeys: []
    },
    createTime: now,
    updateTime: now
  }
}

// 初始化角色数据
const initializeRoles = () => {
  if (roleDatabase.length === 0) {
    // 初始化5个默认角色
    for (let i = 1; i <= 5; i++) {
      roleDatabase.push(generateRandomRole(`role-${uuidv4().slice(0, 8)}`))
    }
  }
}

// 初始化角色数据
initializeRoles()

// 角色相关 Mock 接口
export const roleMock: MockMethod[] = [
  // 获取角色列表（支持分页和筛选）
  {
    url: '/mock/roles/list',
    method: 'get',
    response: (req: any) => {
      // 检查权限
      const token = req.headers.authorization
      if (!token || token.indexOf('Bearer ') === -1) {
        return {
          code: 1,
          data: null,
          msg: '未登录，无法获取角色列表'
        }
      }

      // 获取请求参数
      const { roleName, pageNum = 1, pageSize = 10 } = req.query

      // 筛选角色
      let filteredRoles = [...roleDatabase]

      if (roleName) {
        filteredRoles = filteredRoles.filter(role => role.roleName.includes(roleName))
      }

      // 分页处理
      const total = filteredRoles.length
      const startIndex = (pageNum - 1) * pageSize
      const paginatedRoles = filteredRoles.slice(startIndex, startIndex + Number(pageSize))

      return {
        code: 0,
        data: {
          list: paginatedRoles,
          page: {
            pageNum: Number(pageNum),
            pageSize: Number(pageSize),
            total
          }
        },
        msg: '获取角色列表成功'
      }
    }
  },

  // 创建角色
  {
    url: '/mock/roles/create',
    method: 'post',
    response: (req: any) => {
      // 检查权限
      const token = req.headers.authorization
      if (!token || token.indexOf('Bearer ') === -1) {
        return {
          code: 1,
          data: null,
          msg: '未登录，无法创建角色'
        }
      }

      const { roleName, remark } = req.body as Role.CreateParams

      // 验证参数
      if (!roleName) {
        return {
          code: 400,
          data: null,
          msg: '角色名称不能为空'
        }
      }

      // 检查角色名称是否已存在
      const exists = roleDatabase.some(role => role.roleName === roleName)
      if (exists) {
        return {
          code: 400,
          data: null,
          msg: `角色名称"${roleName}"已存在`
        }
      }

      // 创建新角色
      const now = new Date().toISOString().slice(0, 19).replace('T', ' ')
      const newRole: Role.RoleItem = {
        _id: `role-${uuidv4().slice(0, 8)}`,
        roleName,
        remark: remark || '',
        permissionList: {
          checkedKeys: [],
          halfCheckedKeys: []
        },
        createTime: now,
        updateTime: now
      }

      roleDatabase.push(newRole)

      return {
        code: 0,
        data: newRole,
        msg: '创建角色成功'
      }
    }
  },

  // 编辑角色
  {
    url: '/mock/roles/edit',
    method: 'post',
    response: (req: any) => {
      // 检查权限
      const token = req.headers.authorization
      if (!token || token.indexOf('Bearer ') === -1) {
        return {
          code: 1,
          data: null,
          msg: '未登录，无法编辑角色'
        }
      }

      const { _id, roleName, remark } = req.body as Role.EditParams

      // 验证参数
      if (!_id || !roleName) {
        return {
          code: 400,
          data: null,
          msg: '角色ID和角色名称不能为空'
        }
      }

      // 查找角色
      const roleIndex = roleDatabase.findIndex(role => role._id === _id)
      if (roleIndex === -1) {
        return {
          code: 404,
          data: null,
          msg: `未找到ID为${_id}的角色`
        }
      }

      // 检查角色名称是否已存在（排除当前角色）
      const exists = roleDatabase.some(role => role.roleName === roleName && role._id !== _id)
      if (exists) {
        return {
          code: 400,
          data: null,
          msg: `角色名称"${roleName}"已存在`
        }
      }

      // 更新角色
      const now = new Date().toISOString().slice(0, 19).replace('T', ' ')
      roleDatabase[roleIndex] = {
        ...roleDatabase[roleIndex],
        roleName,
        remark: remark || '',
        updateTime: now
      }

      return {
        code: 0,
        data: roleDatabase[roleIndex],
        msg: '编辑角色成功'
      }
    }
  },

  // 删除角色
  {
    url: '/mock/roles/delete',
    method: 'post',
    response: (req: any) => {
      // 检查权限
      const token = req.headers.authorization
      if (!token || token.indexOf('Bearer ') === -1) {
        return {
          code: 1,
          data: null,
          msg: '未登录，无法删除角色'
        }
      }

      const { _id } = req.body

      // 验证参数
      if (!_id) {
        return {
          code: 400,
          data: null,
          msg: '角色ID不能为空'
        }
      }

      // 查找角色
      const roleIndex = roleDatabase.findIndex(role => role._id === _id)
      if (roleIndex === -1) {
        return {
          code: 404,
          data: null,
          msg: `未找到ID为${_id}的角色`
        }
      }

      // 检查是否为系统内置角色（禁止删除）
      const systemRoles = ['超级管理员', '系统管理员']
      if (systemRoles.includes(roleDatabase[roleIndex].roleName)) {
        return {
          code: 400,
          data: null,
          msg: `系统内置角色"${roleDatabase[roleIndex].roleName}"不允许删除`
        }
      }

      // 删除角色
      roleDatabase.splice(roleIndex, 1)

      return {
        code: 0,
        data: { _id },
        msg: '删除角色成功'
      }
    }
  },

  // 设置角色权限
  {
    url: '/mock/roles/update/permission',
    method: 'post',
    response: (req: any) => {
      // 检查权限
      const token = req.headers.authorization
      if (!token || token.indexOf('Bearer ') === -1) {
        return {
          code: 1,
          data: null,
          msg: '未登录，无法设置角色权限'
        }
      }

      const { _id, permissionList } = req.body as Role.Permission

      // 验证参数
      if (!_id || !permissionList) {
        return {
          code: 400,
          data: null,
          msg: '角色ID和权限列表不能为空'
        }
      }

      // 查找角色
      const roleIndex = roleDatabase.findIndex(role => role._id === _id)
      if (roleIndex === -1) {
        return {
          code: 404,
          data: null,
          msg: `未找到ID为${_id}的角色`
        }
      }

      // 更新权限
      const now = new Date().toISOString().slice(0, 19).replace('T', ' ')
      roleDatabase[roleIndex] = {
        ...roleDatabase[roleIndex],
        permissionList,
        updateTime: now
      }

      return {
        code: 0,
        data: roleDatabase[roleIndex],
        msg: '设置角色权限成功'
      }
    }
  },

  // 获取所有角色列表（不分页）
  {
    url: '/mock/roles/allList',
    method: 'get',
    response: (req: any) => {
      // 检查权限
      const token = req.headers.authorization
      if (!token || token.indexOf('Bearer ') === -1) {
        return {
          code: 1,
          data: null,
          msg: '未登录，无法获取角色列表'
        }
      }

      return {
        code: 0,
        data: roleDatabase,
        msg: '获取所有角色列表成功'
      }
    }
  }
]

// 将角色相关 Mock 添加到你的导出默认数组中
// export default [
//   ...现有其他接口,
//   ...roleMock
// ] as MockMethod[]
