import { createRole, editRole } from '@/api/roleApi'
import type { Role } from '@/types/api'
import { IActionData, type IModalProp } from '@/types/modal'
import { Form, Input, Modal } from 'antd'
import { useImperativeHandle, useState, type FC } from 'react'

const CreateRole: FC<IModalProp<Role.RoleItem>> = ({ mRef, update }) => {
  const [action, setAction] = useState(IActionData.Create)
  const [visible, setVisible] = useState(false)

  const [form] = Form.useForm()

  useImperativeHandle(mRef, () => {
    return {
      open(type, data) {
        if (type === IActionData.Create) {
          setAction(IActionData.Create)
        } else if (data) {
          setAction(IActionData.Update)
          form.setFieldsValue(data)
        }
        setVisible(true)
      }
    }
  })

  const handleOk = async () => {
    const res = await form.validateFields()
    if (res && action === IActionData.Create) {
      await createRole(form.getFieldsValue())
    } else {
      await editRole(form.getFieldsValue())
    }
    setVisible(false)
    update()
  }
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  return (
    <Modal
      title={action === IActionData.Create ? '创建角色' : '编辑角色'}
      width={600}
      okText='确认'
      cancelText='取消'
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 4 }}>
        <Form.Item name='_id' hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name='roleName'
          label='角色名称'
          rules={[
            {
              required: true,
              message: '请输入角色名称'
            }
          ]}
        >
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item name='remark' label='备注'>
          <Input.TextArea placeholder='请输入备注' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateRole
