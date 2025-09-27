import { createUser, getDeptList, updateUser } from '@/api/api'
import { getAllRoleList } from '@/api/roleApi'
import type { Dept, Role, User } from '@/types/api'
import { IActionData, type IAction, type IModalProp } from '@/types/modal'
import { message } from '@/utils/antdGlobal'
import { getItem } from '@/utils/storage'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Select, TreeSelect, Upload } from 'antd'
import type { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload'
import * as React from 'react'
import { useState } from 'react'

export const CreateUser: React.FC<IModalProp<User.UserItem>> = props => {
  const [form] = Form.useForm()
  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([]) // 部门列表
  const [allRoleList, setAllRoleList] = useState<Role.RoleItem[]>([]) // 所有的角色列表

  // 暴露子组件open方法
  React.useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })
  React.useEffect(() => {
    handleDeptList()
    handleAllRoleList()
  }, [])

  const handleDeptList = async () => {
    const res = await getDeptList()
    setDeptList(res.list)
  }

  const handleAllRoleList = async () => {
    const res = await getAllRoleList()
    setAllRoleList(res)
  }

  //调用弹框显示方法
  const open = (type: IAction, data?: User.UserItem) => {
    setAction(type)
    setVisible(true)
    if (type === IActionData.Update) {
      form.setFieldsValue(data)
    }
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
    console.log(values, action)
    const params = { ...values, img }
    if (action === IActionData.Create) {
      // 新增
      await createUser(params)
    } else if (action === IActionData.Update) {
      // 编辑
      await updateUser(params)
    }
    props.update()
    setVisible(false)
    form.resetFields()
    message.success(`用户${action === IActionData.Create ? '新增' : '编辑'}成功`)
  }
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
    setImg('')
  }
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
        <Form.Item name='userId' hidden>
          <Input></Input>
        </Form.Item>
        <Form.Item
          name='userName'
          label='用户名称'
          rules={[
            { required: true, message: '请输入用户名称' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符' }
          ]}
        >
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item
          name='userEmail'
          label='用户邮箱'
          rules={[
            { required: true, message: '请输入用户邮箱' },
            { type: 'email', message: '请输入正确的邮箱格式' }
          ]}
        >
          <Input placeholder='请输入用户邮箱' disabled={action === IActionData.Update} />
        </Form.Item>
        <Form.Item name='mobile' label='手机号' rules={[{ len: 11, message: '请输入正确的手机号格式' }]}>
          <Input type='number' placeholder='请输入手机号' />
        </Form.Item>
        <Form.Item name='deptId' label='部门' rules={[{ required: true, message: '请选择部门' }]}>
          <TreeSelect
            placeholder='请选择部门'
            allowClear
            treeDefaultExpandAll
            showCheckedStrategy={TreeSelect.SHOW_ALL}
            fieldNames={{ label: 'deptName', value: '_id' }}
            treeData={deptList}
          />
        </Form.Item>

        <Form.Item label='系统角色' name='roleList'>
          <Select placeholder='请选择角色'>
            {allRoleList.map(item => {
              return (
                <Select.Option value={item._id} key={item._id}>
                  {item.roleName}
                </Select.Option>
              )
            })}
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
