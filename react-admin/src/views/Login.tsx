import { request } from '@/utils/request'
import * as React from 'react'

export const Login: React.FC = () => {
  React.useEffect(() => {
    handleLogin()
  }, [])

  const handleLogin = async () => {
    const res = await request.post('/test', {
      username: 'admin',
      password: '123456'
    })

    console.log(res)
  }

  return <div>Login </div>
}
