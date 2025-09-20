import * as React from 'react'
import { Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'
import styles from './index.module.less'

export const Dashboard: React.FC = () => {
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户ID',
      children: 'Zhou Maomao'
    },
    {
      key: '2',
      label: '邮箱',
      children: '1810000000'
    },
    {
      key: '3',
      label: '状态',
      children: 'Hangzhou, Zhejiang'
    },
    {
      key: '4',
      label: '手机号',
      children: 'empty'
    },
    {
      key: '5',
      label: '岗位',
      children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China'
    }
  ]

  return (
    <div className={styles['dashboard-wrapper']}>
      <div className={styles['user-info']}>
        <img
          src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          alt='avatar'
          className={styles['userImg']}
        />
        <Descriptions title='欢迎新同学，每天都要开心！' items={items} />
      </div>
      <div className={styles['report']}>
        <div className={styles['card']}>
          <div className={styles['title']}>用户总数</div>
          <div className={styles['data']}>100个</div>
        </div>
        <div className={styles['card']}>
          <div className={styles['title']}>总流水</div>
          <div className={styles['data']}>10个</div>
        </div>
        <div className={styles['card']}>
          <div className={styles['title']}>岗位总数</div>
          <div className={styles['data']}>10个</div>
        </div>
        <div className={styles['card']}>
          <div className={styles['title']}>岗位总数</div>
          <div className={styles['data']}>10个</div>
        </div>
      </div>
    </div>
  )
}
