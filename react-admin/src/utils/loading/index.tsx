import ReactDOM from 'react-dom/client'
import { Loading } from './Loading'

let count = 0

export const showLoading = () => {
  if (count === 0) {
    const dom = document.createElement('div')
    dom.setAttribute('id', 'loading')
    document.body.appendChild(dom)
    ReactDOM.createRoot(dom).render(<Loading />)
  }
  count++
}

export const hideLoading = () => {
  if (count < 0) return
  count--
  const dom = document.getElementById('loading')
  if (dom) {
    dom.remove()
  }
}
