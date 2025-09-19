import * as React from 'react'
import styles from '@/views/login/index.module.less'
import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

export const Login: React.FC = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    console.log('Success:', values)
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>
          <h4>系统登录</h4>
        </div>
        <Form name='basic' onFinish={onFinish} autoComplete='off'>
          <Form.Item<FieldType> name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type='primary' htmlType='submit' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
