import { Form, Input, InputNumber, Modal, Select } from 'antd'
import * as React from 'react'
export const CreateUser: React.FC = () => {
  const [form] = Form.useForm()
  const handleSubmit = async () => {
    const values = await form.validateFields()
    console.log(values)
  }
  const handleCancel = () => {}
  return (
    <Modal
      title='创建用户'
      width={800}
      open={true}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText='确定'
      cancelText='取消'
    >
      <Form form={form} labelCol={{ span: 4 }} labelAlign='right'>
        <Form.Item name='userName' label='用户名称' rules={[{ required: true, message: '请输入用户名称' }]}>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='userEmail' label='用户邮箱' rules={[{ required: true, message: '请输入用户邮箱' }]}>
          <Input placeholder='请输入用户邮箱' />
        </Form.Item>
        <Form.Item name='mobile' label='手机号'>
          <Input type='number' placeholder='请输入手机号' />
        </Form.Item>
        <Form.Item name='deptId' label='部门' rules={[{ required: true, message: '请选择部门' }]}>
          <Select style={{ width: 120 }} placeholder='请选择部门'>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>部门1</Select.Option>
            <Select.Option value={2}>部门2</Select.Option>
            <Select.Option value={3}>部门3</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name='role' label='角色' rules={[{ required: true, message: '请选择角色' }]}>
          <Select style={{ width: 120 }} placeholder='请选择角色'>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>管理员</Select.Option>
            <Select.Option value={2}>体验管理员</Select.Option>
            <Select.Option value={3}>普通用户</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name='job' label='岗位'>
          <Input placeholder='请输入岗位' />
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Select style={{ width: 120 }} placeholder='请选择状态'>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
