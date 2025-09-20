import React, { useState } from 'react'
import { AppstoreOutlined, DesktopOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import type { MenuProps, MenuTheme } from 'antd'
import { Menu, Switch } from 'antd'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: '1',
    label: '工作台',
    icon: <DesktopOutlined />
  },
  {
    key: '2',
    label: '系统管理',
    icon: <SettingOutlined />,
    children: [{ key: '3', label: '用户管理' }]
  }
]

const App: React.FC = () => {
  const [theme, setTheme] = useState<MenuTheme>('dark')
  const [current, setCurrent] = useState('1')
  const navigate = useNavigate()

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light')
  }

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e)
    setCurrent(e.key)
  }

  const handleClickLogo = () => {
    navigate('/')
  }

  return (
    <div className={styles.navSide}>
      <div className={styles.logo} onClick={handleClickLogo}>
        <h1 style={{ color: 'white', fontSize: 30 }}>X</h1>
        <h2 style={{ color: 'white', fontSize: 20 }}>后台管理</h2>

        {/* <img src='/imgs/logo.png' style={{ width: collapsed ? 60 : 'auto' }} /> */}
      </div>
      <Menu
        theme={theme}
        onClick={onClick}
        style={{ width: 256 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode='inline'
        items={items}
      />
    </div>
  )
}

export default App
