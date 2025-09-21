import './App.less'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ConfigProvider, App as AppAntd } from 'antd'
import AntdGlobal from './utils/antdGlobal'

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ed6c00'
          }
        }}
      >
        <AppAntd>
          {/*  全局antd组件  */}
          <AntdGlobal />
          <RouterProvider router={router} />
        </AppAntd>
      </ConfigProvider>
    </>
  )
}

export default App
