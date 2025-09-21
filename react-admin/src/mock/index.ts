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
          userImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        msg: '获取用户信息成功'
      }
    }
  },
  {
    url: '/mock/dashboard/reportData',
    method: 'post',
    response: (res: any) => {
      return {
        code: 0,
        data: {
          driverCount: 312300,
          totalMoney: 1120000,
          orderCount: 1100420,
          cityNum: 1022
        },
        msg: '获取工作台报表汇总数据成功'
      }
    }
  },
  {
    url: '/mock/dashboard/lineData',
    method: 'post',
    response: (res: any) => {
      return {
        code: 0,
        data: {
          label: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          order: [100, 200, 300, 400, 500, 600, 700],
          money: [1000, 2000, 3000, 4000, 5000, 6000, 7000]
        },
        msg: '获取工作台折线图数据成功'
      }
    }
  },
  {
    url: '/mock/dashboard/pieData',
    method: 'post',
    response: (res: any) => {
      return {
        code: 0,
        data: [
          {
            value: 100,
            name: '订单'
          },
          {
            value: 200,
            name: '用户'
          },
          {
            value: 300,
            name: '司机'
          }
        ],
        msg: '获取工作台饼图数据成功'
      }
    }
  },
  {
    url: '/mock/dashboard/pieData2',
    method: 'post',
    response: (res: any) => {
      return {
        code: 0,
        data: [
          {
            value: 100,
            name: '订单'
          },
          {
            value: 200,
            name: '用户'
          },
          {
            value: 300,
            name: '司机'
          }
        ],
        msg: '获取工作台饼图数据2成功'
      }
    }
  },
  {
    url: '/mock/dashboard/radarData',
    method: 'post',
    response: (res: any) => {
      return {
        code: 0,
        data: {
          indicator: [
            { name: '订单', max: 10000 },
            { name: '用户', max: 10000 },
            { name: '司机', max: 10000 }
          ],
          data: {
            name: '当前',
            value: [1020, 3200, 8300]
          }
        },
        msg: '获取工作台雷达图数据成功'
      }
    }
  }
] as MockMethod[]

// 用于生产环境的 Mock 服务器设置
export function setupProdMockServer() {
  // 生产环境 Mock 服务器设置
}
