import React, { useEffect } from 'react'
import { Layout, Watermark } from 'antd'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import MenuComponent from '@/components/Menu'
import { Navigate, Outlet, useLocation, useRouteLoaderData } from 'react-router-dom'
const { Sider } = Layout
import styles from './index.module.less'
import { userInfo } from '@/api/api'
import { userStore } from '@/store'
import type { IAuthLoader } from '@/router/AuthLoader'
import { router } from '@/router'
import { searchRoute } from '@/utils'
const App: React.FC = () => {
  const state = userStore()
  const { pathname } = useLocation()
  useEffect(() => {
    handleGetUserInfo()
  }, [])

  const handleGetUserInfo = async () => {
    const res = await userInfo()
    state.updateUserInfo(res)
  }

  // 权限判断
  const data = useRouteLoaderData('layout') as IAuthLoader
  const route = searchRoute(pathname, router)
  if (route && route.meta?.auth === false) {
    // 继续执行
  } else {
    const staticPath = ['/welcome', '/403', '/404']
    if (!data.menuPathList.includes(pathname) && !staticPath.includes(pathname)) {
      return <Navigate to='/403' />
    }
  }

  return (
    <Layout>
      <Sider
        breakpoint='lg'
        collapsed={state.collapsed}
        onBreakpoint={broken => {}}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
      >
        <div className='demo-logo-vertical' />
        <MenuComponent />
      </Sider>
      <Layout>
        <NavHeader />
        <Watermark content='React'>
          <div className={styles.content}>
            <div className={styles.wrapper}>
              <Outlet></Outlet>
            </div>
          </div>
        </Watermark>

        <NavFooter />
      </Layout>
    </Layout>
  )
}

export default App
