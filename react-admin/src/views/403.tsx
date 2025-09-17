import { Button, Result } from 'antd'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

export const Forbidden: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Result
        status='403'
        title='403'
        subTitle='抱歉，您没有权限访问该页面'
        extra={
          <Button type='primary' onClick={() => navigate('/')}>
            回到主页
          </Button>
        }
      />
    </div>
  )
}
