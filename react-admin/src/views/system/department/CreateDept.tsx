import type { Dept } from '@/types/api'
import { IActionData, type IAction, type IModalProp } from '@/types/modal'
import { Form, Input, Modal, Select, TreeSelect } from 'antd'
import { useImperativeHandle, useState, type FunctionComponent } from 'react'

const CreateDept: FunctionComponent<IModalProp<Dept.DeptItem>> = ({ mRef, update }) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')

  useImperativeHandle(mRef, () => {
    return {
      open(type, data) {
        setAction(type)
        setVisible(true)
        if (type === IActionData.Update) {
          form.setFieldsValue(data)
        }
        update()
      }
    }
  })

  const onCancel = () => {
    setVisible(false)
    form.resetFields()
  }
  const onOk = () => {
    form.validateFields().then(values => {
      console.log(values)
    })
  }
  return (
    <Modal
      title={action === 'create' ? '新增部门' : '编辑部门'}
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
      width={800}
      okText='确定'
      cancelText='取消'
    >
      <Form form={form} labelCol={{ span: 4 }} style={{ marginTop: 20 }}>
        <Form.Item label='上级部门' name='parentId'>
          <TreeSelect treeData={[]} placeholder='请选择' />
        </Form.Item>
        <Form.Item label='部门名称' name='deptName' rules={[{ required: true, message: '请输入部门名称' }]}>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item label='负责人' name='userName' rules={[{ required: true, message: '请输入负责人' }]}>
          <Select placeholder='请选择'>
            <Select.Option value='1' key='1'>
              张三
            </Select.Option>
            <Select.Option value='2' key='2'>
              李四
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateDept
