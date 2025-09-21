import type { User } from '@/types/api'
import type { IAction, IModalProp } from '@/types/modal'
import { message } from '@/utils/antdGlobal'
import { getItem } from '@/utils/storage'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Select, Upload } from 'antd'
import type { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload'
import * as React from 'react'
import { useState } from 'react'

export const CreateUser: React.FC<IModalProp> = props => {
  const [form] = Form.useForm()
  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  // 暴露子组件open方法
  React.useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })
  //调用弹框显示方法
  const open = (type: IAction, data?: User.UserItem) => {
    setAction(type)
    setVisible(true)
  }

  // 上传前接口处理
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('上传图片格式错误，请上传jpg/png格式图片')
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('上传图片大小不能超过2MB')
      return false
    }
    return true
  }

  // 上传后，图片处理
  const handleOnchange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setImg(info.file.url || '')
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    const values = await form.validateFields()
    console.log(values)
  }
  const handleCancel = () => {}
  return (
    <Modal
      title='创建用户'
      width={800}
      open={visible}
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
        <Form.Item label='用户头像'>
          <Upload
            listType='picture-card'
            showUploadList={false}
            headers={{
              Authorization: 'Bearer ' + getItem('token')
            }}
            action={'/mock/system/user/upload'}
            beforeUpload={beforeUpload}
            onChange={handleOnchange}
          >
            {img && <img src={img} alt='avatar' style={{ width: '100%' }} />}
            {!img && (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 5 }}>上传头像</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}
