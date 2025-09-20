import React from 'react'
import { Layout, Watermark } from 'antd'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import MenuComponent from '@/components/Menu'
import { Outlet } from 'react-router-dom'
const { Sider } = Layout
import styles from './index.module.less'
const App: React.FC = () => {
  return (
    <Layout>
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        width={256}
        onBreakpoint={broken => {
          console.log(broken)
        }}
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
