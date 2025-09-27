import { getRoleList } from '@/api/roleApi'
import { useEffect, type FunctionComponent } from 'react'

interface RoleListProps {}

const RoleList: FunctionComponent<RoleListProps> = () => {
  useEffect(() => {
    handleGetRole()
  }, [])

  const handleGetRole = async () => {
    const res = await getRoleList()
    console.log('res', res)
  }

  return <div>角色列表</div>
}

export default RoleList
