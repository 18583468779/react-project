import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/mock/test',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          message: 'Mock data received successfully!'
        }
      }
    }
  },
  {
    url: '/mock/login',
    method: 'post',
    timeout: 1000,
    response: (req: any) => {
      return {
        code: 0,
        data: {
          token: '123456'
        },
        msg: '登录成功'
      }
    }
  },
  {
    url: '/mock/loginError',
    method: 'post',
    timeout: 1000,
    response: (req: any) => {
      return {
        code: 1,
        data: null,
        msg: '登录失败'
      }
    }
  },
  {
    url: '/mock/userInfo',
    method: 'post',
    response: (res: any) => {
      console.log('res', res.headers.authorization)
      const token = res.headers.authorization
      if (!token || token.indexOf('Bearer ') === -1) {
        return {
          code: 1,
          data: null,
          msg: '未登录'
        }
      }
      return {
        code: 0,
        data: {
          _id: '1',
          userId: 1,
          userName: '张三',
          userEmail: 'zhangsan@example.com',
          deptId: '1',
          state: 1,
          mobile: '13800000000',
          job: '前端开发',
          role: 1,
          roleList: '1,2',
          createId: 1,
          deptName: '开发部',
          userImg: 'https://example.com/avatar.jpg'
        },
        msg: '获取用户信息成功'
      }
    }
  }
] as MockMethod[]

// 用于生产环境的 Mock 服务器设置
export function setupProdMockServer() {
  // 生产环境 Mock 服务器设置
}
