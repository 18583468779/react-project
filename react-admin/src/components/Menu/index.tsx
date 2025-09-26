import React, { useEffect, useState } from 'react'
import type { MenuProps, MenuTheme } from 'antd'
import { Menu } from 'antd'
import styles from './index.module.less'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import { userStore } from '@/store'
import type { Menu as MenuType } from '@/types/api'
import * as Icons from '@ant-design/icons'

type MenuItem = Required<MenuProps>['items'][number]


function createIcon(name?: string) {
  if (!name) return <></>
  const customerIcons: { [key: string]: any } = Icons
  const icon = customerIcons[name]
  if (!icon) return <></>
  return React.createElement(icon)
}

const getItem = (label: React.ReactNode, key?: React.Key | null, icon?: React.ReactNode, children?: MenuItem[]) => {
  return {
    key,
    label,
    icon,
    children
  } as MenuItem
}

 // 递归生成菜单
 const getTreeMenu = (menuList: MenuType.MenuItem[], treeList: MenuItem[] = []) => {
  menuList.forEach((item, index) => {
    if (item.menuType === 1 && item.menuState === 1) {
      if (item.buttons) return treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon)))
      treeList.push(
        getItem(item.menuName, item.path || index, createIcon(item.icon), getTreeMenu(item.children || []))
      )
    }
  })
  return treeList
}



const App: React.FC = () => {
  const collapsed = userStore(state => state.collapsed)
  const [theme, setTheme] = useState<MenuTheme>('dark')
  const navigate = useNavigate()
  const data = useRouteLoaderData('layout')
  const [menuList,setMenuList] = useState<MenuItem[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const {pathname} = useLocation()

  useEffect(()=>{
    if(data){
      setMenuList(getTreeMenu(data.menuList))
      setSelectedKeys([pathname])
    }
  },[])

  const onClick: MenuProps['onClick'] = e => {
    setSelectedKeys([e.key])
    navigate(e.key)
  }

  const handleClickLogo = () => {
    navigate('/')
  }

  return (
    <div className={styles.navSide}>
      <div className={styles.logo} onClick={handleClickLogo}>
        <h1 style={{ color: 'white', fontSize: 30 }}>X</h1>
        {
          !collapsed && <h2 style={{ color: 'white', fontSize: 20 }}>后台管理</h2>
        }

        {/* <img src='/imgs/logo.png' style={{ width: collapsed ? 60 : 'auto' }} /> */}
      </div>
      <Menu
        theme={theme}
        onClick={onClick}
        inlineCollapsed={collapsed}
        style={{ width: collapsed ? 80 : 'auto' }}
        selectedKeys={selectedKeys}
        mode='inline'
        items={menuList}
      />
    </div>
  )
}

export default App
