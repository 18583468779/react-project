import { hideLoading, showLoading } from '@/utils/loading'
import { request } from '@/utils/request'
import * as React from 'react'
export const Welcome: React.FC = () => {
  React.useEffect(() => {
    ;(async function () {
      // showLoading()
      await request.get('/user/info')
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
