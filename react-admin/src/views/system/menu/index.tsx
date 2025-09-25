import { deleteMenu, getMenuList } from '@/api/api'
import type { Menu } from '@/types/api'
import { toLocalDate } from '@/utils'
import { Button, Form, Input, Popconfirm, Radio, Select, Space, Table, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useRef, useState, type FunctionComponent } from 'react'
import { IActionData, type IAction } from '@/types/modal'
import CreateMenu from './CreateMenu'

interface Props {}

const MenuList: FunctionComponent<Props> = () => {
  const [form] = Form.useForm()
  const createMenuRef = useRef<{
    open: (type: IAction, data?: Menu.MenuItem | { parentId?: string; orderBy: number }) => void
  }>({
    open: () => {}
  })
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])

  useEffect(() => {
    handleGetMenuList()
  }, [])

  const handleGetMenuList = async () => {
    const res = (await getMenuList(form.getFieldsValue())) as any
    setMenuList(res.list)
  }

  const handleCreate = () => {
    createMenuRef.current.open(IActionData.Create,{ orderBy: menuList.length} )
  }

  const handleSubCreate = (id: string) => {
    createMenuRef.current.open(IActionData.Create, { parentId: id, orderBy: menuList.length })
  }

  const handleEdit = (record: Menu.MenuItem) => {
    createMenuRef.current.open(IActionData.Update, { ...record,  })
  }

  const handleDelete = async (_id: string) => {
    await deleteMenu({ _id })
    message.success('删除成功')
    handleGetMenuList()
  }

  const colmuns: ColumnsType<Menu.MenuItem> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName'
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon'
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render(menuType: number) {
        return {
          1: '菜单',
          2: '按钮',
          3: '页面'
        }[menuType]
      }
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode'
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '组件名称',
      dataIndex: 'component',
      key: 'component'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime) {
        return toLocalDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleSubCreate(record._id)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Popconfirm title='确定删除吗？' onConfirm={() => handleDelete(record._id)} okText="确认" cancelText="取消">
              <Button type='text' danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  return (
    <div>
      <Form className='search-form' layout='inline' form={form}>
        <Form.Item name='menuName' label='菜单名称'>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Select placeholder='请选择菜单状态' allowClear style={{ width: 120 }}>
            <Select.Option value={1}>启用</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={handleGetMenuList}>
              搜索
            </Button>
            <Button type='default' onClick={() => form.resetFields()}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>菜单列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='_id' columns={colmuns} dataSource={menuList} pagination={false} />
      </div>
      <CreateMenu
        mRef={createMenuRef}
        update={() => {
          handleGetMenuList()
        }}
      />
    </div>
  )
}

export default MenuList
