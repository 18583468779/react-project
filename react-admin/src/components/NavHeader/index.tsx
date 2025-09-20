import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Dropdown, Switch } from 'antd'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import { useEffect } from 'react'

const NavHeader = () => {
  const items: MenuProps['items'] = [
    { key: 'email', label: '邮箱: ' },
    { key: 'logout', label: '退出' }
  ]
  const onClick: MenuProps['onClick'] = ({ key }) => {}

  // 控制菜单关闭和展开
  const toggleCollapsed = () => {}

  useEffect(() => {}, [])

  const handleSwitch = (isDark: boolean) => {}

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <div onClick={toggleCollapsed}>{<MenuUnfoldOutlined />}</div>
        <Breadcrumb
          style={{ marginLeft: 10 }}
          items={[
            {
              title: 'Home'
            },
            {
              title: <a href=''>Application Center</a>
            },
            {
              title: <a href=''>Application List</a>
            },
            {
              title: 'An Application'
            }
          ]}
        />
      </div>
      <div className='right'>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' className='mr-3' onChange={handleSwitch} />
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <span className={styles.nickName}>谢文</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
