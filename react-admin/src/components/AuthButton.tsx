/**
 * @description 按钮权限组件
 *
 */

import type { IAuthLoader } from '@/router/AuthLoader'
import { useRouteLoaderData } from 'react-router-dom'
import { userStore } from '@/store'
import { Button } from 'antd'

export enum RoleType {
  'superManage' = 0,
  'manage' = 1,
  'member' = 3
}

const AuthButton = (props: any) => {
  const data = useRouteLoaderData('layout') as IAuthLoader // 获取菜单数据
  const role = userStore(state => state.userInfo.role) // 获取当前用户权限
  if (!props.auth) return <Button {...props}>{props.children}</Button>
  if (data.buttonList.includes(props.auth || role == RoleType.superManage || role == RoleType.manage)) {
    return <Button {...props}>{props.children}</Button>
  }
  return <></>
}

export default AuthButton
