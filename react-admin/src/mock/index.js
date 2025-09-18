import Mock from 'mockjs'

// 模拟数据库中的用户
let users = [
  {
    id: '1',
    username: 'admin',
    password: '123456', // 实际项目中会加密存储
    nickname: '管理员',
    avatar: 'https://picsum.photos/id/1/200/200',
    role: 'admin'
  },
  {
    id: '2',
    username: 'user',
    password: '123456',
    nickname: '普通用户',
    avatar: 'https://picsum.photos/id/2/200/200',
    role: 'user'
  }
]

// 登录接口
Mock.mock('/api/login', 'post', req => {
  const { username, password } = JSON.parse(req.body)

  // 查找用户
  const user = users.find(u => u.username === username && u.password === password)

  if (user) {
    // 模拟生成token
    const token = Mock.Random.guid()

    return {
      code: 200,
      message: '登录成功',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          nickname: user.nickname,
          avatar: user.avatar,
          role: user.role
        }
      }
    }
  } else {
    return {
      code: 401,
      message: '用户名或密码错误'
    }
  }
})

// 注册接口
Mock.mock('/api/register', 'post', req => {
  const { username, password, nickname } = JSON.parse(req.body)

  // 检查用户名是否已存在
  const existingUser = users.find(u => u.username === username)
  if (existingUser) {
    return {
      code: 400,
      message: '用户名已存在'
    }
  }

  // 创建新用户
  const newUser = {
    id: Mock.Random.id(),
    username,
    password,
    nickname: nickname || username,
    avatar: `https://picsum.photos/id/${parseInt(Math.random() * 100)}/200/200`,
    role: 'user'
  }

  users.push(newUser)

  return {
    code: 200,
    message: '注册成功',
    data: {
      id: newUser.id,
      username: newUser.username,
      nickname: newUser.nickname
    }
  }
})

// 获取用户信息接口
Mock.mock('/api/user/info', 'get', req => {
  // 从请求头获取token（实际项目中会验证token）
  const token = req.headers.token

  if (!token) {
    return {
      code: 401,
      message: '未登录，请先登录'
    }
  }

  // 模拟通过token获取用户信息（实际项目中会解析token获取用户ID）
  // 这里简单处理，返回第一个用户
  const user = users[0]

  return {
    code: 200,
    message: '获取成功',
    data: {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      avatar: user.avatar,
      role: user.role,
      // 可以添加更多用户信息
      email: Mock.Random.email(),
      phone: Mock.Random.phone(),
      createTime: Mock.Random.datetime()
    }
  }
})
Mock.mock('/api/user/list', 'get', () => {
  return {
    code: 200,
    message: '获取成功',
    data: users
  }
})
// 退出登录接口
Mock.mock('/api/logout', 'post', () => {
  return {
    code: 200,
    message: '退出成功'
  }
})

// 测试接口：GET /test
Mock.mock('/test', 'get', () => {
  return { code: 200, message: 'mock服务正常工作' }
})
