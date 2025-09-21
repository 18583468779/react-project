import * as React from 'react'
import { Button, Card, Descriptions, Flex } from 'antd'
import type { DescriptionsProps } from 'antd'
import styles from './index.module.less'
import * as echarts from 'echarts'
import { userStore } from '@/store'
import { formatMoney, formatNum, formatState } from '@/utils'
import { getReportData } from '@/api/api'
import type { Dashboard as DashboardType } from '@/types/api'
import { useState } from 'react'
import { useCharts } from '@/hook/useCharts'

export const Dashboard: React.FC = () => {
  const userInfo = userStore(state => state.userInfo)
  const [reportData, setReportData] = useState<DashboardType.ReportData>()
  const [lineRef, lineChart] = useCharts()
  const [pieRef1, pieChart1] = useCharts()
  const [pieRef2, pieChart2] = useCharts()
  const [radarRef, radarChart] = useCharts()
  React.useEffect(() => {
    lineChart?.setOption({
      title: {},
      grid: {
        left: 50,
        top: 50,
        right: 50,
        bottom: 50
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        }
      },
      legend: {
        data: ['订单', '流水'],
        position: 'top',
        top: 0
      },
      xAxis: {
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20, 10, 10, 10, 10, 10, 10]
        },
        {
          name: '流水',
          type: 'line',
          data: [15, 20, 16, 12, 15, 21, 11, 15, 16, 18, 12, 10]
        }
      ]
    })
    pieChart1?.setOption({
      title: {
        text: '司机城市分布'
      },
      grid: {
        left: 50,
        top: 50,
        right: 50,
        bottom: 50
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        top: 0,
        left: 0
      },
      series: [
        {
          name: '司机城市分布',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 335, name: '北京' },
            { value: 310, name: '上海' },
            { value: 234, name: '广州' },
            { value: 135, name: '深圳' }
          ]
        }
      ]
    })
    pieChart2?.setOption({
      title: {
        text: '司机年龄分布'
      },
      grid: {
        left: 50,
        top: 50,
        right: 50,
        bottom: 50
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        top: 0,
        left: 0
      },

      series: [
        {
          name: '司机年龄分布',
          type: 'pie',
          radius: ['20%', '70%'],
          roseType: 'area',
          data: [
            { value: 335, name: '20岁以下' },
            { value: 310, name: '20岁以上' },
            { value: 234, name: '30岁以上' },
            { value: 135, name: '40岁以上' },
            { value: 135, name: '50岁以上' }
          ]
        }
      ]
    })
    radarChart?.setOption({
      title: {},
      grid: {
        left: 50,
        top: 50,
        right: 50,
        bottom: 50
      },
      tooltip: {},
      legend: {
        data: ['司机模型诊断']
      },
      radar: {
        indicator: [
          { name: '服务态度', max: 6500 },
          { name: '在线时长', max: 16000 },
          { name: '接单率', max: 30000 },
          { name: '关注度', max: 100000 },
          { name: '评分', max: 5 }
        ]
      },
      series: [
        {
          name: '司机模型诊断',
          type: 'radar',
          data: [
            {
              value: [4300, 10000, 28000, 35000, 3],
              name: '模型诊断'
            }
          ]
        }
      ]
    })
  }, [lineChart, pieChart1, pieChart2, radarChart])

  React.useEffect(() => {
    handleGetReportData()
  }, [])

  const handleGetReportData = async () => {
    const res = await getReportData()
    setReportData(res)
  }

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户ID',
      children: userInfo?.userId || 'empty'
    },
    {
      key: '2',
      label: '邮箱',
      children: userInfo?.userEmail || 'empty'
    },
    {
      key: '3',
      label: '状态',
      children: formatState(userInfo?.state || 0) || 'empty'
    },
    {
      key: '4',
      label: '手机号',
      children: userInfo?.mobile || 'empty'
    },
    {
      key: '5',
      label: '岗位',
      children: userInfo?.job || 'empty'
    }
  ]

  return (
    <div className={styles['dashboard-wrapper']}>
      <div className={styles['user-info']}>
        <img
          src={userInfo?.userImg || 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
          alt='avatar'
          className={styles['userImg']}
        />
        <Descriptions title={`欢迎${userInfo?.userName || '新同学'}，每天都要开心！`} items={items} />
      </div>
      <div className={styles['report']}>
        <div className={styles['card']}>
          <div className={styles['title']}>用户总数</div>
          <div className={styles['data']}>{formatNum(reportData?.driverCount || 0)} 个</div>
        </div>
        <div className={styles['card']}>
          <div className={styles['title']}>总流水</div>
          <div className={styles['data']}>{formatMoney(reportData?.totalMoney || 0)}</div>
        </div>
        <div className={styles['card']}>
          <div className={styles['title']}>总订单数</div>
          <div className={styles['data']}>{formatNum(reportData?.orderCount || 0)} 单</div>
        </div>
        <div className={styles['card']}>
          <div className={styles['title']}>开通城市</div>
          <div className={styles['data']}>{formatNum(reportData?.cityNum || 0)} 座</div>
        </div>
      </div>
      <div className={styles['chart']}>
        <Card title='订单和流水走势图' extra={<Button type='primary'>刷新</Button>}>
          <div ref={lineRef} className={styles['item-line']}></div>
        </Card>
      </div>
      <div className={styles['chart']}>
        <Card title='司机分布' extra={<Button type='primary'>刷新</Button>}>
          <Flex justify='space-between'>
            <div ref={pieRef1} className={styles['item-line']}></div>
            <div ref={pieRef2} className={styles['item-line']}></div>
          </Flex>
        </Card>
      </div>

      <div className={styles['chart']}>
        <Card title='模型诊断' extra={<Button type='primary'>刷新</Button>}>
          <div ref={radarRef} className={styles['item-line']}></div>
        </Card>
      </div>
    </div>
  )
}
