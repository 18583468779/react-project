import { Button, Form, Input, Space, Table } from 'antd'
import search from 'antd/es/transfer/search'
import type { FunctionComponent } from 'react'

interface Props {}

const Department: FunctionComponent<Props> = () => {
  return (
    <div>
      <Form className='search-form' layout='inline'>
        <Form.Item name='userId' label='部门名称'>
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
            <Button type='primary'>新增</Button>
          </div>
        </div>
        <Table bordered rowKey='userId' columns={[]} dataSource={[]} />
      </div>
    </div>
  )
}

export default Department
