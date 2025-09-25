import { getPermissionList } from '@/api/api'

export default async function AuthLoader() {
  const data = await getPermissionList()
  return {
    buttonList: data.buttonList,
    menuList: data.menuList,
    menuPathList: []
  }
}
