import type { MockMethod } from 'vite-plugin-mock'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

// 确保上传目录存在
const uploadDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// 全局用户数据存储
let userDatabase: any = []

// 生成随机用户数据
const generateRandomUser = (id: number) => {
  const departments = ['开发部', '产品部', '设计部', '测试部', '市场部', '人事部', '财务部']
  const jobs = ['前端开发', '后端开发', '产品经理', 'UI设计', '测试工程师', '市场专员', '人事专员', '财务专员']
  const roles = [1, 2, 3, 4] // 不同角色ID

  // 随机生成中文姓名
  const familyNames = ['张', '王', '李', '赵', '刘', '陈', '杨', '黄', '周', '吴', '徐', '孙', '胡', '朱', '高']
  const givenNames = [
    '伟',
    '芳',
    '娜',
    '秀英',
    '敏',
    '静',
    '强',
    '磊',
    '军',
    '洋',
    '勇',
    '艳',
    '杰',
    '涛',
    '明',
    '华',
    '慧',
    '丽',
    '桂',
    '红'
  ]
  const familyName = familyNames[Math.floor(Math.random() * familyNames.length)]
  const givenName = givenNames[Math.floor(Math.random() * givenNames.length)]
  const fullName = familyName + givenName

  // 随机生成状态(0:禁用, 1:正常)
  const userState = Math.random() > 0.1 ? 1 : 0 // 10%概率禁用

  // 随机选择部门和职位
  const deptIndex = Math.floor(Math.random() * departments.length)
  const jobIndex = Math.floor(Math.random() * jobs.length)

  // 随机生成手机号
  const mobilePrefix = [
    '138',
    '139',
    '130',
    '131',
    '132',
    '133',
    '134',
    '135',
    '136',
    '137',
    '186',
    '189',
    '185',
    '177',
    '155'
  ]
  const prefix = mobilePrefix[Math.floor(Math.random() * mobilePrefix.length)]
  const suffix = Math.floor(Math.random() * 100000000)
    .toString()
    .padStart(8, '0')
  const mobile = prefix + suffix

  // 随机生成角色列表
  const userRoles = [
    ...new Set(
      [
        roles[Math.floor(Math.random() * roles.length)],
        Math.random() > 0.5 ? roles[Math.floor(Math.random() * roles.length)] : null
      ].filter(Boolean)
    )
  ]

  return {
    _id: id.toString(),
    userId: id,
    userName: fullName,
    userEmail: `${fullName.toLowerCase()}${id}@example.com`,
    deptId: (deptIndex + 1).toString(),
    state: userState,
    mobile: mobile,
    job: jobs[jobIndex],
    role: userRoles[0],
    roleList: userRoles.join(','),
    createId: Math.floor(Math.random() * 10) + 1,
    deptName: departments[deptIndex],
    userImg: `https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ${id % 5}.png`
  }
}

// 初始化20条用户数据
const initializeUsers = () => {
  if (userDatabase.length === 0) {
    for (let i = 1; i <= 20; i++) {
      userDatabase.push(generateRandomUser(i))
    }
  }
}

// 初始化用户数据
initializeUsers()

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
  },
  {
    url: '/mock/user/list',
    method: 'post',
    response: (res: any) => {
      // 检查是否有token
      const hasToken = res.headers['authorization']
      if (!hasToken) {
        return {
          code: 401,
          data: null,
          msg: '未授权访问，请先登录'
        }
      }

      // 获取请求参数，默认页大小设为20
      const { userId, userName, state, pageNum = 1, pageSize = 20 } = res.body

      // 从全局数据库获取并筛选用户
      let filteredUsers = [...userDatabase]

      // 根据参数筛选
      if (userId) {
        filteredUsers = filteredUsers.filter(user => user.userId === userId)
      }

      if (userName) {
        filteredUsers = filteredUsers.filter(user => user.userName.includes(userName))
      }

      if (state !== undefined) {
        filteredUsers = filteredUsers.filter(user => user.state === state)
      }

      // 计算分页
      const total = filteredUsers.length
      const startIndex = (pageNum - 1) * pageSize
      const endIndex = startIndex + pageSize
      const paginatedList = filteredUsers.slice(startIndex, endIndex)

      return {
        code: 0,
        data: {
          list: paginatedList,
          page: {
            pageNum,
            pageSize,
            total
          }
        },
        msg: '获取用户列表成功'
      }
    }
  },
  {
    url: '/mock/system/user/upload',
    method: 'post',
    response: async (req: any, res: any) => {
      try {
        // 在实际环境中，这里会解析multipart/form-data获取文件内容
        // 这里我们模拟文件信息
        console.log('req', req.body)
        const fileExt = req.body.fileName ? req.body.fileName.split('.').pop() : 'png'
        const fileName = `${uuidv4()}.${fileExt}`
        const filePath = path.join(uploadDir, fileName)

        // 模拟写入文件到当前目录下的uploads文件夹
        // 实际场景中应该是从req.file.buffer获取文件内容
        const mockFileContent = Buffer.from('mock image content', 'utf8')
        fs.writeFileSync(filePath, mockFileContent)

        // 生成可访问的URL（相对路径）
        const fileUrl = `/uploads/${fileName}`

        return {
          code: 0,
          data: {
            url: fileUrl,
            filePath: filePath, // 本地绝对路径
            fileName: fileName,
            fileSize: mockFileContent.length,
            message: `文件已保存到: ${filePath}`
          },
          msg: '上传成功，文件已保存到本地目录'
        }
      } catch (error: any) {
        return {
          code: 500,
          data: null,
          msg: `上传失败: ${error.message}`
        }
      }
    }
  },
  {
    url: '/mock/user/create',
    method: 'post',
    response: (req: any) => {
      try {
        const newUser = req.body

        // 生成新的用户ID（确保唯一）
        const maxId = userDatabase.reduce((max, user) => Math.max(max, user.userId), 0)
        const newUserId = maxId + 1

        // 补充必要的用户信息
        const userToAdd = {
          ...newUser,
          _id: newUserId.toString(),
          userId: newUserId,
          // 如果没有提供头像，使用默认头像
          userImg:
            newUser.userImg ||
            `https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ${newUserId % 5}.png`
        }

        // 添加到全局数据库
        userDatabase.push(userToAdd)

        return {
          code: 0,
          data: userToAdd,
          msg: '创建用户成功'
        }
      } catch (error: any) {
        return {
          code: 500,
          data: null,
          msg: `创建用户失败: ${error.message}`
        }
      }
    }
  },
  {
    url: '/mock/user/update',
    method: 'post',
    response: (req: any) => {
      try {
        const updatedUser = req.body
        const userId = updatedUser.userId

        // 查找用户在数据库中的索引
        const userIndex = userDatabase.findIndex(user => user.userId === userId)

        if (userIndex === -1) {
          return {
            code: 404,
            data: null,
            msg: `未找到ID为${userId}的用户`
          }
        }

        // 更新用户信息
        userDatabase[userIndex] = {
          ...userDatabase[userIndex],
          ...updatedUser
        }

        return {
          code: 0,
          data: userDatabase[userIndex],
          msg: '更新用户成功'
        }
      } catch (error: any) {
        return {
          code: 500,
          data: null,
          msg: `更新用户失败: ${error.message}`
        }
      }
    }
  }
] as MockMethod[]

// 用于生产环境的 Mock 服务器设置
export function setupProdMockServer() {
  // 生产环境 Mock 服务器设置
}
