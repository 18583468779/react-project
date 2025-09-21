import * as React from 'react'
import { Button, Card, Descriptions, Flex } from 'antd'
import type { DescriptionsProps } from 'antd'
import styles from './index.module.less'
import * as echarts from 'echarts'
import { userStore } from '@/store'
import { formatMoney, formatNum, formatState } from '@/utils'
import { getLineData, getPieData, getPieData2, getRadarData, getReportData } from '@/api/api'
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
    renderLineChart()
    renderPieChart1()
    renderPieChart2()
    renderRadarChart()
  }, [lineChart, pieChart1, pieChart2, radarChart])

  const renderLineChart = async () => {
    const data = await getLineData()
    if (!data) {
      return
    }
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
        data: data?.label || []
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: data?.order || []
        },
        {
          name: '流水',
          type: 'line',
          data: data?.money || []
        }
      ]
    })
  }

  const renderPieChart1 = async () => {
    const res = await getPieData()
    if (!res) {
      return
    }
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
          data: res || []
        }
      ]
    })
  }
  const renderPieChart2 = async () => {
    const data = await getPieData2()
    if (!data) {
      return
    }
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
          data: data || []
        }
      ]
    })
  }

  const renderRadarChart = async () => {
    const data = await getRadarData()
    if (!data) {
      return
    }
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
        indicator: data?.indicator || []
      },
      series: [
        {
          name: '司机模型诊断',
          type: 'radar',
          data: [
            {
              value: data?.data.value || [],
              name: '模型诊断'
            }
          ]
        }
      ]
    })
  }

  const handleRefresh = () => {
    renderPieChart1()
    renderPieChart2()
  }

  React.useEffect(() => {
    handleGetReportData()
  }, [])

  // 获取工作台报表汇总数据
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
        <Card
          title='订单和流水走势图'
          extra={
            <Button type='primary' onClick={renderLineChart}>
              刷新
            </Button>
          }
        >
          <div ref={lineRef} className={styles['item-line']}></div>
        </Card>
      </div>
      <div className={styles['chart']}>
        <Card
          title='司机分布'
          extra={
            <Button type='primary' onClick={handleRefresh}>
              刷新
            </Button>
          }
        >
          <Flex justify='space-between'>
            <div ref={pieRef1} className={styles['item-line']}></div>
            <div ref={pieRef2} className={styles['item-line']}></div>
          </Flex>
        </Card>
      </div>

      <div className={styles['chart']}>
        <Card
          title='模型诊断'
          extra={
            <Button type='primary' onClick={renderRadarChart}>
              刷新
            </Button>
          }
        >
          <div ref={radarRef} className={styles['item-line']}></div>
        </Card>
      </div>
    </div>
  )
}
