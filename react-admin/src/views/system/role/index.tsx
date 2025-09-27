import { delRole, getRoleList } from '@/api/roleApi'
import type { Role } from '@/types/api'
import { message } from '@/utils/antdGlobal'
import { useAntdTable } from 'ahooks'
import { Button, Form, Input, Popconfirm, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useRef, type FunctionComponent } from 'react'
import CreateRole from './CreateRole'
import { IActionData, type IAction, type IModalProp } from '@/types/modal'
import CreatePermission from './CreatePermission'

interface RoleListProps {}

const RoleList: FunctionComponent<RoleListProps> = () => {
  const [form] = Form.useForm()
  const roleRef = useRef<{
    open: (type: IAction, data?: Role.RoleItem) => void
  }>({ open: () => {} })
  const permissionRef = useRef<{
    open: (type: IAction, data?: Role.RoleItem) => void
  }>({ open: () => {} })

  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: Role.Params) => {
    return getRoleList({ ...formData, pageNum: current, pageSize }).then(data => {
      return {
        total: data.page.total,
        list: data.list
      }
    })
  }

  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10
  })

  const handleDelete = async (_id: string) => {
    await delRole({ _id })
    message.success('删除成功')
    search.submit()
  }

  const handleCreate = () => {
    roleRef.current.open(IActionData.Create)
  }
  const handleEdit = (record: Role.RoleItem) => {
    roleRef.current.open(IActionData.Update, record)
  }
  const handlePermission = (record: Role.RoleItem) => {
    permissionRef.current.open(IActionData.Create, record)
  }
  const columns: ColumnsType<Role.RoleItem> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '操作',
      key: 'action',
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' onClick={() => handlePermission(record)}>
              设置权限
            </Button>
            <Popconfirm okText='删除' cancelText='取消' title='确认删除吗？' onConfirm={() => handleDelete(record._id)}>
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
    <div className='role-wrap'>
      <Form form={form} className='search-form' layout='inline'>
        <Form.Item name='roleName' label='角色名称'>
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={search.submit}>
              搜索
            </Button>
            <Button type='default' onClick={search.reset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>角色列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='_id' columns={columns} {...tableProps} />
      </div>
      {/* 创建角色组件 */}
      <CreateRole
        mRef={roleRef}
        update={() => {
          search.submit()
        }}
      />
      {/* 设置权限 */}
      <CreatePermission
        mRef={permissionRef}
        update={() => {
          search.submit()
        }}
      />
    </div>
  )
}

export default RoleList
