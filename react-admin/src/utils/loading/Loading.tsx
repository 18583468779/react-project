import { Spin } from 'antd'
import * as React from 'react'
import './loading.css'

export const Loading: React.FC<{ tip?: string }> = ({ tip = '' }) => {
  return (
    <Spin size='large' tip={tip}>
      <div></div>
    </Spin>
  )
}
