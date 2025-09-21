import * as echarts from 'echarts'
import { useEffect, useRef, useState, type RefObject } from 'react'

export const useCharts = (): [RefObject<HTMLDivElement | null>, echarts.ECharts | undefined] => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartInstance, setChartInstance] = useState<echarts.ECharts>()
  useEffect(() => {
    const instance = echarts.init(chartRef.current)
    setChartInstance(instance)
  }, [])
  return [chartRef, chartInstance]
}
