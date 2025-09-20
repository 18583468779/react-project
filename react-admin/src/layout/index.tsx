import React from 'react'
import { Layout, theme } from 'antd'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import MenuComponent from '@/components/Menu'
const { Content, Sider } = Layout

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

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
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            content
          </div>
        </Content>
        <NavFooter />
      </Layout>
    </Layout>
  )
}

export default App
