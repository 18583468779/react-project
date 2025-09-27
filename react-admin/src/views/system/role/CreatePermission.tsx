import { getMenuList } from '@/api/api'
import { updatePermission } from '@/api/roleApi'
import type { Menu, Role } from '@/types/api'
import { IActionData, type IModalProp } from '@/types/modal'
import { message } from '@/utils/antdGlobal'
import { Form, Input, Modal, Tree } from 'antd'
import { useEffect, useImperativeHandle, useState, type FC } from 'react'

const CreatePermission: FC<IModalProp<Role.RoleItem>> = ({ mRef, update }) => {
  const [visible, setVisible] = useState(false)
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])
  const [roleInfo, setRoleInfo] = useState<Role.RoleItem>()
  const [permission, setPermission] = useState<Role.Permission>()
  useImperativeHandle(mRef, () => {
    return {
      open(type, data) {
        setVisible(true)
        setRoleInfo(data)
        setCheckedKeys(data.permissionList.checkedKeys || [])
      }
    }
  })

  useEffect(() => {
    handleMenuList()
  }, [])

  const handleMenuList = async () => {
    const menuList = await getMenuList()
    setMenuList(menuList.list)
  }

  const onCheck = (checkedKeysValue: any, item: any) => {
    setCheckedKeys(checkedKeysValue)
    const checkedKeys: string[] = [] // 按钮
    const parentKeys: string[] = [] // 菜单或页面

    item.checkedNodes.map((node: Menu.MenuItem) => {
      if (node.menuType === 2) {
        checkedKeys.push(node._id)
      } else {
        parentKeys.push(node._id)
      }
    })
    setPermission({
      _id: roleInfo?._id || '',
      permissionList: {
        checkedKeys,
        halfCheckedKeys: parentKeys.concat(item.halfCheckedKeys)
      }
    })
  }
  const handleOk = async () => {
    if (permission) await updatePermission(permission)
    message.success('权限设置成功')
    handleCancel()
    update()
  }
  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <Modal
      title={'编辑权限'}
      width={600}
      okText='确认'
      cancelText='取消'
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form>
        <Form.Item label='角色名称'>{roleInfo?.roleName}</Form.Item>
        <Form.Item label='权限'>
          <Tree
            checkable
            defaultExpandAll
            treeData={menuList}
            fieldNames={{ title: 'menuName', key: '_id' }}
            checkedKeys={checkedKeys}
            onCheck={onCheck}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreatePermission
