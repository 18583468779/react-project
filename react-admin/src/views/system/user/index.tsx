// 第三方库
import { deleteUser, getUserList } from '@/api/api'
import type { PageParams, User } from '@/types/api'
import { Button, Table, Form, Input, Select, Space, Modal, message, Popconfirm } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useRef, useState } from 'react'
import { CreateUser } from './CreateUser'
import type { IAction } from '@/types/modal'
import { useAntdTable } from 'ahooks'
export default function UserList() {
  const [form] = Form.useForm()
  const [userIds, setUserIds] = useState<string[]>([])
  const userRef = useRef<{
    open: (type: IAction, data?: User.UserItem) => void
  }>({
    open: () => {}
  })

  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }) => {
    return getUserList({
      pageNum: current,
      pageSize: pageSize
    }).then(res => {
      return {
        total: res.page.total,
        list: res.list
      }
    })
  }

  const { tableProps, search } = useAntdTable(getTableData, {
    form
  })

  // 删除用户
  const handleDelete = async (record: User.UserItem) => {
    await deleteUser({ ids: [record.userId] })
    search.reset()
    message.success('删除成功')
  }
  // 批量删除
  const handlePatchDelete = async () => {
    if (userIds.length === 0) {
      message.error('请选择要删除的用户')
      return
    }
    await deleteUser({ ids: userIds })
    search.reset()
    setUserIds([])
    message.success('删除成功')
  }

  // 打开弹窗
  const handleOpenModal = () => {
    userRef.current.open('create')
  }
  const columns: ColumnsType<User.UserItem> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户'
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '在职',
          2: '离职',
          3: '试用期'
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '操作',
      render(record, values) {
        return (
          <Space>
            <Button type='text' onClick={() => userRef.current.open('update', record)}>
              编辑
            </Button>
            <Popconfirm okText='删除' cancelText='取消' title='确认删除吗？' onConfirm={() => handleDelete(record)}>
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
    <div className='user-list'>
      <Form className='search-form' layout='inline' form={form}>
        <Form.Item name='userId' label='用户ID'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Select style={{ width: 120 }} placeholder='请选择状态'>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
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
          <div className='title'>用户列表</div>
          <div className='action'>
            <Button type='primary' onClick={() => handleOpenModal()}>
              新增
            </Button>
            <Button type='primary' danger disabled={userIds.length === 0} onClick={() => handlePatchDelete()}>
              批量删除
            </Button>
          </div>
        </div>
        <Table
          bordered
          rowSelection={{
            type: 'checkbox',
            onChange(selectedRowKeys) {
              setUserIds(selectedRowKeys as string[])
            }
          }}
          rowKey='userId'
          columns={columns}
          {...tableProps}
        />
        <CreateUser
          mRef={userRef}
          update={() => {
            search.reset()
          }}
        />
      </div>
    </div>
  )
}
