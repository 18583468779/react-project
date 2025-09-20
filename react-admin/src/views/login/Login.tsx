import * as React from 'react'
import styles from '@/views/login/index.module.less'
import type { FormProps } from 'antd'
import { LockFilled, UserOutlined } from '@ant-design/icons'
import { App, Button, Form, Input } from 'antd'
import { login, loginError } from '@/api/api'
import type { LoginType } from '@/types/api'
import { setItem } from '@/utils/storage'
import { useState } from 'react'

export const Login: React.FC = () => {
  const { message } = App.useApp()
  const [loading, setLoading] = useState(false)
  const onFinish: FormProps<LoginType.params>['onFinish'] = async values => {
    setLoading(true)
    const res = await login(values)
    // const res = await loginError(values)
    setItem('token', res.token)
    setLoading(false)
    const params = new URLSearchParams(window.location.search)
    const redirect = params.get('redirect') || '/'
    message.success('登录成功')
    // setTimeout(() => {
    //   window.location.href = redirect
    // }, 200)
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>
          <h4>系统登录</h4>
        </div>
        <Form name='basic' onFinish={onFinish} autoComplete='off'>
          <Form.Item<LoginType.params> name='username' rules={[{ required: true, message: '请输入用户名' }]}>
            <Input prefix={<UserOutlined />} placeholder='用户名' />
          </Form.Item>

          <Form.Item<LoginType.params> name='password' rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password prefix={<LockFilled />} placeholder='密码' />
          </Form.Item>

          <Form.Item label={null}>
            <Button type='primary' htmlType='submit' block loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
