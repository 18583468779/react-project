import { createMenu, getMenuList, updateMenu } from '@/api/api'
import type { Menu } from '@/types/api'
import { IActionData, type IAction, type IModalProp } from '@/types/modal'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Form, Input, InputNumber, Modal, Radio, Select, TreeSelect } from 'antd'
import { useEffect, useImperativeHandle, useState, type FunctionComponent } from 'react'
import IconSelect from '@/components/IconSelect'
const CreateMenu: FunctionComponent<IModalProp<Menu.MenuItem>> = ({ mRef, update }) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])
  const [icon,setIcon] = useState<string>('')



  useEffect(() => {
    handleGetMenuList()
  }, [])

  const handleGetMenuList = async () => {
    const res = (await getMenuList()) as any
    setMenuList(res.list)
  }

  useImperativeHandle(mRef, () => {
    return {
      open(type, data) {
        setAction(type)
        setVisible(true)
        if (data) {
          form.setFieldsValue(data)
          setIcon(data.icon || '')
        }
        update()
      }
    }
  })

  // 选择图标
  const handleIconChange = (value: string) => {
    setIcon(value)
  }

  const onCancel = () => {
    setVisible(false)
    form.resetFields()
    setIcon('')
  }
  const onOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      if (action === IActionData.Create) {
        await createMenu({...form.getFieldsValue(),icon})
      } else {
        await updateMenu({...form.getFieldsValue(),icon})
      }
      onCancel()
      update()
    }
  }
  return (
    <Modal
      title={action === 'create' ? '新增菜单' : '编辑菜单'}
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
      width={800}
      okText='确定'
      cancelText='取消'
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        style={{ marginTop: 20 }}
        initialValues={{
          menuState: 1,
          menuType: 1
        }}
      >
        <Form.Item name='_id' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='父级菜单' name='parentId'>
          <TreeSelect
            treeData={menuList}
            placeholder='请选择'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'menuName', value: '_id' }}
          />
        </Form.Item>
        <Form.Item label='菜单类型' name='menuType'>
          <Radio.Group>
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>按钮</Radio>
            <Radio value={3}>页面</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='菜单名称' name='menuName' rules={[{ required: true, message: '请输入菜单名称' }]}>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {() => {
            return form.getFieldValue('menuType') === 2 ? (
              <Form.Item name='menuCode' label='权限标识'>
                <Input />
              </Form.Item>
            ) : (
              <>
                <Form.Item label='菜单图标' name='icon'>
                  <IconSelect onChange={handleIconChange} defaultValue={icon}  />
                </Form.Item>
                <Form.Item label='路由地址' name='path'>
                  <Input placeholder='请输入路由地址' />
                </Form.Item>
              </>
            )
          }}
        </Form.Item>

        <Form.Item label='组件名称' name='component'>
          <Input placeholder='请输入组件名称' />
        </Form.Item>
        <Form.Item label='排序' name='orderBy' tooltip={{ title: '排序值越大越靠后', icon: <InfoCircleOutlined /> }}>
          <InputNumber placeholder='请输入排序' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={2}>停用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateMenu
