import { getDeptList } from '@/api/api'
import type { Dept } from '@/types/api'
import { toLocalDate } from '@/utils'
import { Button, Form, Input, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useRef, useState, type FunctionComponent } from 'react'
import CreateDept from './CreateDept'
import { IActionData, type IAction } from '@/types/modal'

interface Props {}

const Department: FunctionComponent<Props> = () => {
  const [form] = Form.useForm()
  const createDeptRef = useRef<{
    open: (type: IAction, data?: Dept.DeptItem | { parentId: string }) => void
  }>({
    open: () => {}
  })
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])

  useEffect(() => {
    handleGetDeptList()
  }, [])

  const handleGetDeptList = async () => {
    const res = await getDeptList()
    setDeptList(res.list)
  }

  const handleCreate = () => {
    createDeptRef.current.open(IActionData.Create)
  }

  const handleSubCreate = (id: string) => {
    createDeptRef.current.open(IActionData.Create, { parentId: id })
  }

  const handleEdit = (record: Dept.DeptItem) => {
    createDeptRef.current.open(IActionData.Update, { ...record })
  }

  const colmuns: ColumnsType<Dept.DeptItem> = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName',
      width: 200
    },
    {
      title: '负责人',
      dataIndex: 'userName',
      key: 'userName',
      width: 150
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime) {
        return toLocalDate(updateTime)
      }
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
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  return (
    <div>
      <Form className='search-form' layout='inline' form={form}>
        <Form.Item name='deptName' label='部门名称'>
          <Input placeholder='请输入部门名称' />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type='primary'>搜索</Button>
            <Button type='default'>重置</Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>部门列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='_id' columns={colmuns} dataSource={deptList} pagination={false} />
      </div>
      <CreateDept mRef={createDeptRef} update={handleGetDeptList} />
    </div>
  )
}

export default Department
