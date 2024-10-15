import { useAuth } from '@/hooks/use-auth'
import { Navigate, Outlet } from 'react-router-dom'

interface RoleLayoutProps {
  allowRoles: string[]
}

export default function RoleLayout({ allowRoles }: RoleLayoutProps) {
  const { user } = useAuth()

  if (user && user.role.some((role) => allowRoles.includes(role))) {
    return <Outlet />
  } else {
    return <Navigate to='/404' replace />
  }
}
