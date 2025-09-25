import type { MockMethod } from 'vite-plugin-mock'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import type { Menu } from '@/types/api'

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


// 菜单模块
// 全局菜单数据存储
let menuDatabase: Menu.MenuItem[] = [];

// 生成随机菜单数据
const generateRandomMenu = (id: string, parentId?: string, level = 0): Menu.MenuItem => {
  const menuTypes = [1, 2, 3]; // 1：菜单 2：按钮 3：页面
  const menuStates = [1, 2]; // 1: 正常 2：停用
  
  // 菜单名称
  const baseNames = ['首页', '用户管理', '角色管理', '菜单管理', '系统设置', '数据统计', '日志查询'];
  const buttonNames = ['新增', '编辑', '删除', '查询', '导出', '导入', '批量操作'];
  
  let menuName: string;
  let menuType: number;
  
  // 顶级菜单通常是菜单或页面类型
  if (level === 0) {
    menuType = [1, 3][Math.floor(Math.random() * 2)];
    menuName = baseNames[Math.floor(Math.random() * baseNames.length)];
  } 
  // 子菜单可以是各种类型，按钮通常作为子项
  else {
    menuType = menuTypes[Math.floor(Math.random() * menuTypes.length)];
    menuName = menuType === 2 
      ? buttonNames[Math.floor(Math.random() * buttonNames.length)]
      : `${baseNames[Math.floor(Math.random() * baseNames.length)]}-子项`;
  }

  // 生成创建时间（最近30天内）
  const now = new Date();
  const randomDays = Math.floor(Math.random() * 30);
  now.setDate(now.getDate() - randomDays);
  const createTime = now.toISOString().slice(0, 19).replace('T', ' ');

  const menu: Menu.MenuItem = {
    _id: id,
    menuName,
    menuType,
    menuState: menuStates[Math.floor(Math.random() * menuStates.length)],
    createTime,
    // 根据类型添加不同属性
    ...(menuType === 1 && { 
      icon: ['icon-home', 'icon-user', 'icon-setting', 'icon-menu'][Math.floor(Math.random() * 4)],
      path: `/${menuName.toLowerCase().replace(/\s+/g, '-')}`,
      component: `views/${menuName.toLowerCase().replace(/\s+/g, '-')}/index.vue`
    }),
    ...(menuType === 2 && { menuCode: `btn_${menuName.toLowerCase()}_${id.slice(0, 8)}` }),
    ...(menuType === 3 && { 
      path: `/${menuName.toLowerCase().replace(/\s+/g, '-')}`,
      component: `pages/${menuName.toLowerCase().replace(/\s+/g, '-')}.vue`
    }),
    ...(parentId && { parentId })
  };

  // 递归生成子菜单（顶级菜单有更高概率有子菜单）
  if (level < 2 && Math.random() > (level === 0 ? 0.3 : 0.6)) {
    const childCount = Math.floor(Math.random() * 3) + 1;
    menu.children = [];
    for (let i = 0; i < childCount; i++) {
      const childId = `${id}-${i + 1}`;
      menu.children.push(generateRandomMenu(childId, id, level + 1));
    }
    
    // 为菜单类型添加按钮
    if (menu.menuType === 1 && Math.random() > 0.4) {
      const buttonCount = Math.floor(Math.random() * 3) + 1;
      menu.buttons = [];
      for (let i = 0; i < buttonCount; i++) {
        const buttonId = `${id}-btn-${i + 1}`;
        menu.buttons.push({
          _id: buttonId,
          menuName: buttonNames[Math.floor(Math.random() * buttonNames.length)],
          menuType: 2,
          menuState: 1,
          menuCode: `btn_${menuName.toLowerCase()}_${buttonId.slice(0, 8)}`,
          parentId: id,
          createTime
        });
      }
    }
  }

  return menu;
};

// 初始化菜单数据
const initializeMenus = () => {
  if (menuDatabase.length === 0) {
    // 创建5个顶级菜单
    for (let i = 1; i <= 5; i++) {
      const menuId = `menu-${uuidv4().slice(0, 8)}`;
      menuDatabase.push(generateRandomMenu(menuId));
    }
  }
};

// 初始化菜单数据
initializeMenus();

// 工具函数：递归查找菜单
const findMenuById = (menus: any, id: string): {menu: Menu.MenuItem, parent: Menu.MenuItem | null, index: number} | null => {
  for (let i = 0; i < menus.length; i++) {
    if (menus[i]._id === id) {
      return { menu: menus[i], parent: null, index: i };
    }
    
    if (menus[i].children && menus[i].children.length > 0) {
      const result = findMenuById(menus[i].children, id);
      if (result) {
        return { ...result, parent: menus[i] };
      }
    }
  }
  return null;
};



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
  },
  {
    url: '/mock/user/delete',
    method: 'post',
    response: (req: any) => {
      try {
        const { ids } = req.body
        // 过滤出不在ids中的用户
        userDatabase = userDatabase.filter(user => !ids.includes(user.userId))
        return {
          code: 0,
          data: { ids },
          msg: '删除用户成功'
        }
      } catch (error: any) {
        return {
          code: 500,
          data: null,
          msg: `删除用户失败: ${error.message}`
        }
      }
    }
  },
  {
    url: '/mock/dept/list',
    method: 'post',
    response: (req: any) => {
      return {
        code: 0,
        data: {
          list: [
            {
              _id: 'dept-001',
              deptName: '公司总部', // 顶级部门
              userName: '张三',
              createTime: '2024-01-01 09:00:00',
              updateTime: '2024-01-01 09:00:00',
              children: [
                // 一级部门：技术部
                {
                  _id: 'dept-001-001',
                  deptName: '技术部',
                  userName: '张三',
                  createTime: '2024-01-02 10:00:00',
                  updateTime: '2024-01-02 10:00:00',
                  children: [
                    {
                      _id: 'dept-001-001-001',
                      deptName: '前端开发组',
                      userName: '张三',
                      createTime: '2024-01-03 11:00:00',
                      updateTime: '2024-01-03 11:00:00',
                      children: []
                    },
                    {
                      _id: 'dept-001-001-002',
                      deptName: '后端开发组',
                      userName: '张三',
                      createTime: '2024-01-03 11:00:00',
                      updateTime: '2024-01-03 11:00:00',
                      children: []
                    },
                    {
                      _id: 'dept-001-001-003',
                      deptName: '测试组',
                      userName: '张三',
                      createTime: '2024-01-03 11:00:00',
                      updateTime: '2024-01-03 11:00:00',
                      children: []
                    }
                  ]
                },
                // 一级部门：产品部
                {
                  _id: 'dept-001-002',
                  deptName: '产品部',
                  userName: '张三',
                  createTime: '2024-01-02 10:30:00',
                  updateTime: '2024-01-02 10:30:00',
                  children: [
                    {
                      _id: 'dept-001-002-001',
                      deptName: '产品设计组',
                      userName: '张三',
                      createTime: '2024-01-03 11:30:00',
                      updateTime: '2024-01-03 11:30:00',
                      children: []
                    },
                    {
                      _id: 'dept-001-002-002',
                      deptName: '需求分析组',
                      userName: '张三',
                      createTime: '2024-01-03 11:30:00',
                      updateTime: '2024-01-03 11:30:00',
                      children: []
                    }
                  ]
                },
                // 一级部门：人事部
                {
                  _id: 'dept-001-003',
                  deptName: '人事部',
                  createTime: '2024-01-02 11:00:00',
                  updateTime: '2024-01-02 11:00:00',
                  children: [
                    {
                      _id: 'dept-001-003-001',
                      deptName: '招聘组',
                      createTime: '2024-01-03 12:00:00',
                      updateTime: '2024-01-03 12:00:00',
                      children: []
                    },
                    {
                      _id: 'dept-001-003-002',
                      deptName: '员工关系组',
                      createTime: '2024-01-03 12:00:00',
                      updateTime: '2024-01-03 12:00:00',
                      children: []
                    }
                  ]
                }
              ]
            }
          ],
          page: {
            pageNum: 1,
            pageSize: 20,
            total: 0
          }
        },
        msg: '获取部门列表成功'
      }
    }
  },
  {
    url: '/mock/menu/list',
    method: 'post',
    response: (res: any) => {
      const { menuName, menuState } = res.body;
      
      // 过滤菜单
      let filteredMenus = [...menuDatabase];
      
      if (menuName) {
        filteredMenus = filteredMenus.filter(menu => 
          menu.menuName.includes(menuName)
        );
      }
      
      if (menuState !== undefined) {
        filteredMenus = filteredMenus.filter(menu => 
          menu.menuState === menuState
        );
      }
      
      return {
        code: 0,
        data: {
          list: filteredMenus,
          total: filteredMenus.length
        },
        msg: '获取菜单列表成功'
      };
    }
  },
  
  // 获取菜单详情
  {
    url: '/mock/menu/detail',
    method: 'post',
    response: (res: any) => {
      const { _id } = res.body;
      
      if (!_id) {
        return {
          code: 400,
          data: null,
          msg: '菜单ID不能为空'
        };
      }
      
      const result = findMenuById(menuDatabase, _id);
      
      if (!result) {
        return {
          code: 404,
          data: null,
          msg: `未找到ID为${_id}的菜单`
        };
      }
      
      return {
        code: 0,
        data: result.menu,
        msg: '获取菜单详情成功'
      };
    }
  },
  
  // 创建菜单
  {
    url: '/mock/menu/create',
    method: 'post',
    response: (res: any) => {
      try {
        const menuData: Menu.CreateParams = res.body;
        
        if (!menuData.menuName || menuData.menuType === undefined) {
          return {
            code: 400,
            data: null,
            msg: '菜单名称和菜单类型为必填项'
          };
        }
        
        const menuId = `menu-${uuidv4().slice(0, 8)}`;
        const createTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        const newMenu: Menu.MenuItem = {
          _id: menuId,
          ...menuData,
          createTime: createTime
        };
        
        // 如果有父菜单ID，添加到对应父菜单的children中
        if (menuData.parentId) {
          const parentResult = findMenuById(menuDatabase, menuData.parentId);
          
          if (parentResult) {
            if (!parentResult.menu.children) {
              parentResult.menu.children = [];
            }
            parentResult.menu.children.push(newMenu);
            
            // 如果是按钮类型，同时添加到buttons数组
            if (menuData.menuType === 2) {
              if (!parentResult.menu.buttons) {
                parentResult.menu.buttons = [];
              }
              parentResult.menu.buttons.push(newMenu);
            }
          } else {
            return {
              code: 404,
              data: null,
              msg: `未找到父菜单ID为${menuData.parentId}的菜单`
            };
          }
        } else {
          // 顶级菜单直接添加到数据库
          menuDatabase.push(newMenu);
        }
        
        return {
          code: 0,
          data: newMenu,
          msg: '创建菜单成功'
        };
      } catch (error: any) {
        return {
          code: 500,
          data: null,
          msg: `创建菜单失败: ${error.message}`
        };
      }
    }
  },
  
  // 更新菜单
  {
    url: '/mock/menu/update',
    method: 'post',
    response: (res: any) => {
      try {
        const updateData: Menu.EditParams = res.body;
        
        if (!updateData._id) {
          return {
            code: 400,
            data: null,
            msg: '菜单ID不能为空'
          };
        }
        
        const result = findMenuById(menuDatabase, updateData._id);
        
        if (!result) {
          return {
            code: 404,
            data: null,
            msg: `未找到ID为${updateData._id}的菜单`
          };
        }
        
        // 更新菜单数据（排除_id和createTime）
        const { _id, createTime, ...updateFields } = updateData;
        const updatedMenu = { ...result.menu, ...updateFields };
        
        // 处理父菜单变更的情况
        if (updateFields.parentId && updateFields.parentId !== result.menu.parentId) {
          // 从原父菜单中移除
          if (result.parent) {
            if (result.parent.children) {
              result.parent.children = result.parent.children.filter(
                menu => menu._id !== updateData._id
              );
            }
            // 如果是按钮，同时从buttons中移除
            if (result.menu.menuType === 2 && result.parent.buttons) {
              result.parent.buttons = result.parent.buttons.filter(
                btn => btn._id !== updateData._id
              );
            }
          } else {
            // 顶级菜单从根数组中移除
            menuDatabase = menuDatabase.filter(menu => menu._id !== updateData._id);
          }
          
          // 添加到新的父菜单
          const newParentResult = findMenuById(menuDatabase, updateFields.parentId);
          if (newParentResult) {
            if (!newParentResult.menu.children) {
              newParentResult.menu.children = [];
            }
            newParentResult.menu.children.push(updatedMenu);
            
            // 如果是按钮类型，同时添加到buttons数组
            if (updatedMenu.menuType === 2) {
              if (!newParentResult.menu.buttons) {
                newParentResult.menu.buttons = [];
              }
              newParentResult.menu.buttons.push(updatedMenu);
            }
          } else {
            return {
              code: 404,
              data: null,
              msg: `未找到新的父菜单ID为${updateFields.parentId}的菜单`
            };
          }
        } else {
          // 父菜单未变更，直接更新
          if (result.parent) {
            if (result.parent.children) {
              result.parent.children[result.index] = updatedMenu;
            }
            // 如果是按钮，同时更新buttons数组
            if (updatedMenu.menuType === 2 && result.parent.buttons) {
              const btnIndex = result.parent.buttons.findIndex(btn => btn._id === updateData._id);
              if (btnIndex !== -1) {
                result.parent.buttons[btnIndex] = updatedMenu;
              }
            }
          } else {
            menuDatabase[result.index] = updatedMenu;
          }
        }
        
        return {
          code: 0,
          data: updatedMenu,
          msg: '更新菜单成功'
        };
      } catch (error: any) {
        return {
          code: 500,
          data: null,
          msg: `更新菜单失败: ${error.message}`
        };
      }
    }
  },
  
  // 删除菜单
  {
    url: '/mock/menu/delete',
    method: 'post',
    response: (res: any) => {
      try {
        const { _id } = res.body as Menu.DeleteParams;
        
        if (!_id) {
          return {
            code: 400,
            data: null,
            msg: '菜单ID不能为空'
          };
        }
        
        const result = findMenuById(menuDatabase, _id);
        
        if (!result) {
          return {
            code: 404,
            data: null,
            msg: `未找到ID为${_id}的菜单`
          };
        }
        
        // 检查是否有子菜单
        if (result.menu.children && result.menu.children.length > 0) {
          return {
            code: 400,
            data: null,
            msg: '该菜单包含子菜单，请先删除子菜单'
          };
        }
        
        // 从父菜单或根数组中移除
        if (result.parent) {
          if (result.parent.children) {
            result.parent.children = result.parent.children.filter(
              menu => menu._id !== _id
            );
          }
          // 如果是按钮，同时从buttons中移除
          if (result.menu.menuType === 2 && result.parent.buttons) {
            result.parent.buttons = result.parent.buttons.filter(
              btn => btn._id !== _id
            );
          }
        } else {
          menuDatabase = menuDatabase.filter(menu => menu._id !== _id);
        }
        
        return {
          code: 0,
          data: { _id },
          msg: '删除菜单成功'
        };
      } catch (error: any) {
        return {
          code: 500,
          data: null,
          msg: `删除菜单失败: ${error.message}`
        };
      }
    }
  }
] as MockMethod[]

// 用于生产环境的 Mock 服务器设置
export function setupProdMockServer() {
  // 生产环境 Mock 服务器设置
}
