import { Button, Result } from 'antd'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
export const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Result
        status='404'
        title='404'
        subTitle='抱歉，您访问的页面不存在'
        extra={
          <Button type='primary' onClick={() => navigate('/')}>
            回到主页
          </Button>
        }
      />
    </div>
  )
}
