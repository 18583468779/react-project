import { formatMoney, toLocalDate } from '@/utils'
import { hideLoading, showLoading } from '@/utils/loading'
import { request } from '@/utils/request'
import * as React from 'react'
export const Welcome: React.FC = () => {
  React.useEffect(() => {
    console.log(formatMoney('4234121.111'))
    console.log(toLocalDate(new Date(), 'yyyy-MM-dd'))
    ;(async function () {
      // showLoading()
      await request.get('/test')
    })()
  }, [])

  return (
    <div>
      Welcome
      <button onClick={() => hideLoading()} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 99999 }}>
        hide loading
      </button>
    </div>
  )
}
